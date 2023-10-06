export default interface InputProps {
  type: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (
    event:
      | any
  ) => void;
  onKeyEnter?: (event: any) => void;
}
