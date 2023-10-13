import React from "react";
import { Box, Button, Card, Container, Divider, Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import FeedList from "../components/FeedList";
import CategoryFilter from "../components/filters/CategoryFilter";
import SearchFilter from "../components/filters/SearchFilter";
import PageTitle from "../../components/texts/Title";
import ImageHeader from "../../components/headers/ImageHeader";
import HEADER_IMG from '../../images/headers/espace-discussion.jpg'
import { CONTAINER_SIZE, VERTICAL_SPACING } from "../../utils/variables";
import Title from "../../components/texts/Title";
import { AddIcon } from "@chakra-ui/icons";
import AddButton from "../../components/buttons/AddButton";

const DiscussionFeed: React.FC<any> = () => {

    const { discussionCategories } = useSelector((state: any) => state.app);

    return (
        <Box py={VERTICAL_SPACING}>
            <Container maxW={CONTAINER_SIZE}>
                <Stack spacing={VERTICAL_SPACING}>
                    <Stack direction="row" alignItems="center">
                        <Title>Discussion</Title>
                        <AddButton />
                    </Stack>
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={0}>
                        <Box>
                            <CategoryFilter cateogries={discussionCategories} />
                        </Box>
                        <SearchFilter />
                    </Stack>
                    <Divider opacity={1} borderColor="black" />
                    <Box>
                        <FeedList
                            url="/discussions"
                            noLengthLabel="Aucune discussions trouvées"
                            buttonLabel="Voir plus"
                            cardName="discussion"
                        />
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

export default DiscussionFeed;
