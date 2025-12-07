export interface DataNFT {
  tokenId: string;
  owner: string;
  metadataURI: string;
  accessLevel: 'read' | 'write' | 'full';
}
