


import { Typography, Stack } from "@mui/material"
import { COMMENT_ICON } from "../../utils/icon"


interface PropsInterface{
    length: number
}

const CommentCountIcon : React.FC<PropsInterface> = ({length}) => {

    return (
        <Stack direction="row">
            <COMMENT_ICON />
            <Typography>{length || 0}</Typography>
        </Stack>
    )

}

export default CommentCountIcon