import { MultiLangText } from "@/src/types/global";

export type CategoryComponentType = {
    name: MultiLangText;
    image?: string;
    href?: string;
    clickHandler?: () => void;
}