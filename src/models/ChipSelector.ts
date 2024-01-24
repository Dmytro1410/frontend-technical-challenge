export interface ChipItem {
  id: string | number;
  label: string;
}

export interface ChipSelectorComponent {
  items: ChipItem[];
  error?: string;
  value: string | number | null;
  onChange: (value: string | number) => void;
}
