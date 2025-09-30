// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, euint32, ebool, externalEuint32} from "@fhevm/solidity/lib/FHE.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

/// @title Privacy-preserving BMI Calculator
/// @author fhevm-hardhat-template
/// @notice A privacy-preserving BMI calculator using FHEVM that computes BMI from encrypted height and weight inputs.
contract FHEBMICalculator is SepoliaConfig {
    // BMI Categories represented as encrypted values
    // 0: Underweight (BMI < 18.5)
    // 1: Normal (18.5 <= BMI < 24)
    // 2: Overweight (BMI >= 24)

    /// @notice Emitted when BMI calculation is performed
    /// @param user The address of the user who performed the calculation
    /// @param bmiCategory Encrypted BMI category handle
    event BMICalculated(address indexed user, euint32 bmiCategory);

    /// @notice Calculates BMI category from encrypted height and weight
    /// @param heightCm Encrypted height in centimeters (150-250 cm)
    /// @param weightKg Encrypted weight in kilograms (30-200 kg)
    /// @param heightProof ZK proof for height input
    /// @param weightProof ZK proof for weight input
    function calculateBMICategory(
        externalEuint32 heightCm,
        externalEuint32 weightKg,
        bytes calldata heightProof,
        bytes calldata weightProof
    ) external {
        // Convert external inputs to encrypted values
        euint32 height = FHE.fromExternal(heightCm, heightProof);
        euint32 weight = FHE.fromExternal(weightKg, weightProof);

        // Calculate BMI using integer arithmetic to avoid division issues
        // BMI = weight / (height/100)^2
        // We'll use a simplified classification based on common BMI thresholds

        // For simplicity, we'll classify based on rough estimates:
        // - Underweight: BMI < 18.5
        // - Normal: 18.5 <= BMI < 24
        // - Overweight: BMI >= 24

        // BMI = weight / (height/100)^2 = weight * 10000 / height^2
        // Since we can't divide in FHEVM, we'll compare weight * 10000 with threshold * height^2

        euint32 heightSquared = FHE.mul(height, height);
        euint32 weightScaled = FHE.mul(weight, FHE.asEuint32(10000));

        // Check if BMI < 18.5 (underweight):
        // BMI < 18.5 means weight * 10000 < 18.5 * height^2
        // Since 18.5 = 185/10, we have: weight * 10000 < (185/10) * height^2
        // So: weight * 100000 < 185 * height^2
        euint32 underweightThreshold = FHE.mul(heightSquared, FHE.asEuint32(185));
        ebool isUnderweight = FHE.lt(FHE.mul(weightScaled, FHE.asEuint32(10)), underweightThreshold);

        // Check if BMI >= 24 (overweight):
        // BMI >= 24 means weight * 10000 >= 24 * height^2
        euint32 overweightThreshold = FHE.mul(heightSquared, FHE.asEuint32(24));
        ebool isOverweight = FHE.ge(weightScaled, overweightThreshold);

        // Normal is when not underweight and not overweight
        ebool isNormal = FHE.and(FHE.not(isUnderweight), FHE.not(isOverweight));

        // Select category based on conditions
        euint32 category = FHE.select(isUnderweight, FHE.asEuint32(0),
                            FHE.select(isNormal, FHE.asEuint32(1), FHE.asEuint32(2)));

        // Allow the user and the contract to decrypt this category
        FHE.allow(category, msg.sender);
        FHE.allowThis(category);

        // Emit event with the encrypted BMI category
        emit BMICalculated(msg.sender, category);
    }

}
