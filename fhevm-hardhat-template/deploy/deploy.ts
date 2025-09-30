import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const deployedFHEBMICalculator = await deploy("FHEBMICalculator", {
    from: deployer,
    log: true,
  });

  console.log(`FHEBMICalculator contract: `, deployedFHEBMICalculator.address);
};
export default func;
func.id = "deploy_fhebmiCalculator"; // id required to prevent reexecution
func.tags = ["FHEBMICalculator"];
