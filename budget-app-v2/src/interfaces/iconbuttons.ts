export interface IconButtonProps {
    id: string;
    customClass?: string;
    isActive: boolean;
    Icon: React.ElementType;
    name: string;
    handleClick?: () => void;
    isNameVisible?: boolean;
    iconColor?:string;
    onClick?:()=>void;
  }

export type PartialIButtonProps = Partial<IconButtonProps>;