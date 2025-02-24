export const ITEM_TYPES = {
    PRIMARY:"primary" as const,
    SECONDARY:"secondary" as const
}

export type itemTypes = keyof typeof ITEM_TYPES;

export type itemType = typeof ITEM_TYPES.PRIMARY | typeof ITEM_TYPES.SECONDARY;
