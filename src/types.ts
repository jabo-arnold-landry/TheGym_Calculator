export interface InputType {
  currValue: string;
  operation: string;
  operand: string;
  override?:boolean
}
export interface ActionType {
  type: string;
  value?: string;
}
