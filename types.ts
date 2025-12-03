export enum Verdict {
  TRUE = 'TRUE',
  FALSE = 'FALSE',
  UNVERIFIED = 'UNVERIFIED'
}

export interface Source {
  title: string;
  uri: string;
}

export interface VerificationResult {
  verdict: Verdict;
  rationale: string;
  sources: Source[];
}

export interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
}