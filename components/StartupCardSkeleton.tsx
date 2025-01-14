import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";
import React from "react";

export const StartupCardSkeleton = () => {
    return (
        <>
            {[0, 1, 2, 3, 4].map((index: number) => (
                <li key={cn("skeleton", index)}>
                    <Skeleton className="startup-card_skeleton" />
                </li>
            ))}
        </>
    )
}