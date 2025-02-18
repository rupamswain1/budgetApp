export const ITEM_TYPES = {
    PRIMARY:"Primary" as const,
    SECONDARY:"Secondary" as const
}

export type itemTypes = keyof typeof ITEM_TYPES;

export type itemType = typeof ITEM_TYPES.PRIMARY | typeof ITEM_TYPES.SECONDARY;
