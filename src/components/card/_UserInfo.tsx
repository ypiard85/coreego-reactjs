import { Avatar, Flex, Stack, Text } from "@chakra-ui/react";
import { dateParse } from "../../utils";

interface UsserInfoInterface{
    user: any,
    size?: 'sm' | 'md' | 'xs',
    date: Date
}

const UserInfo : React.FC<UsserInfoInterface> = ({user, size = 'sm', date }) => {

    return (
        <Stack direction="row" alignItems="center">
            <Avatar size={size} />
            <Stack spacing={0}>
                <Text noOfLines={1} as="b" fontSize="sm" > {user.pseudo} </Text>
                <Text color="gray" as="span" fontSize="sm"> {dateParse(date)} </Text>
            </Stack>
        </Stack>
    )
}

export default UserInfo
