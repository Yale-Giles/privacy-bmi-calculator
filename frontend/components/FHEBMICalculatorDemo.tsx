"use client";

import { useFhevm } from "../fhevm/useFhevm";
import { useInMemoryStorage } from "../hooks/useInMemoryStorage";
import { useMetaMaskEthersSigner } from "../hooks/metamask/useMetaMaskEthersSigner";
import { useFHEBMICalculator } from "@/hooks/useFHEBMICalculator";
import { errorNotDeployed } from "./ErrorNotDeployed";

/*
 * Privacy-preserving BMI Calculator Demo Component
 * Features:
 * - Encrypted height and weight input
 * - FHE-based BMI calculation
 * - Privacy-preserving result (only category, not exact BMI value)
 * - Beautiful, modern UI design
 */
export const FHEBMICalculatorDemo = () => {
  const { storage: fhevmDecryptionSignatureStorage } = useInMemoryStorage();
  const {
    provider,
    chainId,
    isConnected,
    connect,
    ethersSigner,
    ethersReadonlyProvider,
    sameChain,
    sameSigner,
    initialMockChains,
  } = useMetaMaskEthersSigner();

  //////////////////////////////////////////////////////////////////////////////
  // FHEVM instance
  //////////////////////////////////////////////////////////////////////////////

  const {
    instance: fhevmInstance,
    status: fhevmStatus,
  } = useFhevm({
    provider,
    chainId,
    initialMockChains,
    enabled: true,
  });

  //////////////////////////////////////////////////////////////////////////////
  // BMI Calculator Hook
  //////////////////////////////////////////////////////////////////////////////

  const bmiCalculator = useFHEBMICalculator({
    instance: fhevmInstance,
    fhevmDecryptionSignatureStorage,
    eip1193Provider: provider,
    chainId,
    ethersSigner,
    ethersReadonlyProvider,
    sameChain,
    sameSigner,
  });

  //////////////////////////////////////////////////////////////////////////////
  // UI Rendering
  //////////////////////////////////////////////////////////////////////////////

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">隐私BMI计算器</h1>
            <p className="text-gray-600 mb-8">连接您的钱包以开始使用完全隐私保护的BMI计算服务</p>
            <button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              onClick={connect}
            >
              连接MetaMask
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (bmiCalculator.isDeployed === false) {
    return errorNotDeployed(chainId);
  }

  const categoryNames = ["偏瘦", "正常", "超重"];
  const categoryColors = {
    0: "text-blue-600 bg-blue-50 border-blue-200",
    1: "text-green-600 bg-green-50 border-green-200",
    2: "text-orange-600 bg-orange-50 border-orange-200"
  };
  const categoryIcons = {
    0: "⚖️",
    1: "✅",
    2: "⚠️"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🔒 隐私BMI计算器</h1>
            <p className="text-gray-600">基于FHEVM的完全隐私保护BMI计算服务</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="mr-2">📝</span>
              输入信息
            </h2>

            {/* Height Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                身高 (厘米)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={bmiCalculator.height}
                  onChange={(e) => bmiCalculator.setHeight(Number(e.target.value))}
                  min="150"
                  max="250"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="170"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">cm</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">范围：150-250cm</p>
            </div>

            {/* Weight Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                体重 (公斤)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={bmiCalculator.weight}
                  onChange={(e) => bmiCalculator.setWeight(Number(e.target.value))}
                  min="30"
                  max="200"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="65"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">kg</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">范围：30-200kg</p>
            </div>

            {/* Calculate Button */}
            <button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg disabled:opacity-50"
              disabled={!bmiCalculator.canCalculateBMI}
              onClick={() => bmiCalculator.calculateBMI(bmiCalculator.height, bmiCalculator.weight)}
            >
              {bmiCalculator.isCalculating ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  计算中...
                </div>
              ) : (
                "🧮 计算BMI"
              )}
            </button>
          </div>

          {/* Result Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="mr-2">📊</span>
              结果
            </h2>

            {/* BMI Category Result */}
            {bmiCalculator.category !== undefined ? (
              <div className={`p-6 rounded-xl border-2 mb-6 ${categoryColors[bmiCalculator.category as keyof typeof categoryColors]}`}>
                <div className="text-center">
                  <div className="text-4xl mb-3">
                    {categoryIcons[bmiCalculator.category as keyof typeof categoryIcons]}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {categoryNames[bmiCalculator.category]}
                  </h3>
                  <p className="text-sm opacity-75">
                    BMI分类结果
                  </p>
                </div>
              </div>
            ) : bmiCalculator.handle ? (
              <div className="p-6 rounded-xl border-2 border-gray-200 bg-gray-50 mb-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">🔐</div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    BMI计算完成
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    您的BMI分类已加密存储，点击下方按钮查看结果
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 mb-6">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-3">📭</div>
                  <p>请先输入身高体重并点击计算</p>
                </div>
              </div>
            )}

            {/* Decrypt Button */}
            {bmiCalculator.handle && !bmiCalculator.isDecrypted && (
              <button
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg disabled:opacity-50 mb-4"
                disabled={!bmiCalculator.canDecryptCategory}
                onClick={bmiCalculator.decryptBMICategory}
              >
                {bmiCalculator.isDecrypting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    解密中...
                  </div>
                ) : (
                  "🔓 查看BMI分类"
                )}
              </button>
            )}

            {/* Reset Button */}
            <button
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-xl transition-all duration-200"
              onClick={bmiCalculator.reset}
            >
              🔄 重新计算
            </button>
          </div>
        </div>

        {/* Status Messages */}
        {bmiCalculator.message && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-800">{bmiCalculator.message}</p>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Info */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">隐私保护说明</h3>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• 您的身高和体重数据在传输和计算过程中完全加密</li>
                <li>• 智能合约只能访问加密数据，无法查看您的实际数值</li>
                <li>• 只有您能解密并查看BMI分类结果</li>
                <li>• BMI的具体数值不会被泄露，只有分类信息（偏瘦/正常/超重）</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technical Details (Collapsible) */}
        <details className="mt-8 bg-white rounded-xl shadow-lg">
          <summary className="cursor-pointer p-6 text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
            🔧 技术详情
          </summary>
          <div className="px-6 pb-6 border-t border-gray-200">
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">区块链状态</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">网络ID:</span>
                    <span className="font-mono text-gray-900">{chainId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">合约地址:</span>
                    <span className="font-mono text-gray-900 text-xs break-all">{bmiCalculator.contractAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">FHEVM状态:</span>
                    <span className={`font-semibold ${fhevmStatus === 'ready' ? 'text-green-600' : 'text-orange-600'}`}>
                      {fhevmStatus}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">计算状态</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">计算中:</span>
                    <span className={bmiCalculator.isCalculating ? 'text-orange-600 font-semibold' : 'text-green-600'}>
                      {bmiCalculator.isCalculating ? '是' : '否'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">解密中:</span>
                    <span className={bmiCalculator.isDecrypting ? 'text-orange-600 font-semibold' : 'text-green-600'}>
                      {bmiCalculator.isDecrypting ? '是' : '否'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">已解密:</span>
                    <span className={bmiCalculator.isDecrypted ? 'text-green-600 font-semibold' : 'text-gray-600'}>
                      {bmiCalculator.isDecrypted ? '是' : '否'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};
