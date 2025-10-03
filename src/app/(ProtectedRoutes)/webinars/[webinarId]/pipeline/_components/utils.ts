import { AttendedTypeEnum } from "@prisma/client";

export const formatColumnTitle = (columntype: AttendedTypeEnum): string => {
    return columntype.split("_").map((word) => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')
}