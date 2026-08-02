import { LivenessResult } from './liveness.ts';
import { compareEmbeddings } from './faceRecognition.ts';

export interface VerificationInput {
  queryEmbedding: number[];
  enrolledEmbedding: number[];
  livenessResult: LivenessResult;
  imageQualityScore: number; // 0.0 - 1.0
  deviceRiskScore: number;   // 0.0 - 1.0 (0 = trusted, 1 = high risk)
  locationRiskScore: number; // 0.0 - 1.0
}

export interface VerificationDecision {
  decision: 'VERIFIED' | 'REJECTED' | 'MANUAL_REVIEW_REQUIRED';
  matchScore: number;        // 0.0 - 1.0 similarity
  confidenceLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  livenessScore: number;
  qualityScore: number;
  failureReason?: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export function evaluateFaceVerification(input: VerificationInput): VerificationDecision {
  const { queryEmbedding, enrolledEmbedding, livenessResult, imageQualityScore, deviceRiskScore, locationRiskScore } = input;

  const distance = compareEmbeddings(queryEmbedding, enrolledEmbedding);
  const matchScore = Math.max(0, Math.round((1 - distance) * 100) / 100);

  // 1. Hard Check: Image quality threshold
  if (imageQualityScore < 0.5) {
    return {
      decision: 'REJECTED',
      matchScore,
      confidenceLevel: 'LOW',
      livenessScore: livenessResult.score,
      qualityScore: imageQualityScore,
      failureReason: 'LOW_QUALITY_CAPTURE_BLURRY',
      riskLevel: 'LOW'
    };
  }

  // 2. Hard Check: Liveness anti-spoofing test
  if (!livenessResult.passed || livenessResult.score < 0.70) {
    return {
      decision: 'REJECTED',
      matchScore,
      confidenceLevel: 'LOW',
      livenessScore: livenessResult.score,
      qualityScore: imageQualityScore,
      failureReason: 'LIVENESS_VERIFICATION_FAILED_SPOOF_RISK',
      riskLevel: 'HIGH'
    };
  }

  // 3. Match Distance Threshold (< 0.6 distance => matchScore >= 0.70)
  if (matchScore < 0.70) {
    return {
      decision: 'REJECTED',
      matchScore,
      confidenceLevel: 'LOW',
      livenessScore: livenessResult.score,
      qualityScore: imageQualityScore,
      failureReason: 'FACE_BIOMETRIC_MISMATCH',
      riskLevel: 'MEDIUM'
    };
  }

  // 4. Risk Combination (High Device or Location Risk triggers Manual Review)
  if (deviceRiskScore > 0.6 || locationRiskScore > 0.6) {
    return {
      decision: 'MANUAL_REVIEW_REQUIRED',
      matchScore,
      confidenceLevel: 'MEDIUM',
      livenessScore: livenessResult.score,
      qualityScore: imageQualityScore,
      failureReason: 'FLAGGED_FOR_MANUAL_REVIEW_LOCATION_OR_DEVICE_RISK',
      riskLevel: 'HIGH'
    };
  }

  // 5. Clean Verification
  return {
    decision: 'VERIFIED',
    matchScore,
    confidenceLevel: matchScore > 0.85 ? 'HIGH' : 'MEDIUM',
    livenessScore: livenessResult.score,
    qualityScore: imageQualityScore,
    riskLevel: 'LOW'
  };
}
