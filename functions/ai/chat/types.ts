export type UserMessageType = {
  id: string;
  sender: string;
  content: string;
  $createdAt: Date;
  loading: boolean;
  additionalData?: {
    actionableSteps?: string[];
  };
};

export type AiResponseType = {
  actionableSteps: string[];
  importantMessage: boolean;
  response: string;
};
