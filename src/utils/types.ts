export interface WorkItem {
  id: string;
  index: number;
  name: string;
  date: string;
  colorNum: number;
  width: number;
  height: number;
  file: File | null;
}
