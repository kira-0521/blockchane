import React, {VFC} from "react";

type Props = {
    children?: any;
    level?: React.ElementType;
}

export const Title: VFC<Props> = ({children, level: CustomTag = "h1"}) => {

    return (
        <CustomTag>
            {children}
        </CustomTag>
    )
}