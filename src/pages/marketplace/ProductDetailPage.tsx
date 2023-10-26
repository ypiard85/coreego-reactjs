import { Box, Button, Card, CardBody, Center, Container, Divider, Flex, Grid, GridItem, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { VERTICAL_SPACING } from "../../utils/variables"
import { useParams } from "react-router"
import useSWR from "swr"
import { Suspense } from "react"
import LoadingPage from "../../components/LoadingPage"
import { BsMessenger, BsSend, BsXLg } from "react-icons/bs";
import ProductCard from "../../components/card/ProductCard"
import ContainerSection from "../components/ContainerSection"
import SlideSwiper from "../../components/swipers/SlideSwiper"
import ThumbSwiper from "../../components/swipers/ThumbSwiper"
import { NavLink } from "react-router-dom"
import Title from "../../components/texts/Title"
import { dateParse, wonToEuro } from "../../utils"
import AvatarUx from "../../components/react-ux/AvatarUx"
import KakaoMap from "../../components/maps/KakaoMap"
import Localisation from "../../components/card/_Localisation"

const Detail = () => {

    const params = useParams()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { data, error, mutate, isLoading } = useSWR('/products/' + params.id, { suspense: true })

    //maintenant 37.54'7 a modifier'015, 126.87'2 a modifier'307

    return (
        <>
            <Modal size="full" motionPreset="none" onClose={() => console.log('closed')} isOpen={true}>
                <ModalContent>
                    <NavLink to="/market-place">
                        <IconButton
                            isRound={true}
                            width={"fit-content"}
                            position={"fixed"}
                            left={2} top={2}
                            colorScheme="red"
                            aria-label={"close"}
                            icon={<BsXLg />}
                            zIndex={10}
                            opacity={0.8}
                        />
                    </NavLink>
                    <Stack
                        spacing={0}
                        direction={{ base: 'column', md: 'row' }}>
                        <Center h={{ base: 300, md: "100vh" }} width={"100%"} flex={1} bg="gray.100">
                            <Box w="100%" h={"100%"}>
                                <ThumbSwiper images={data.images} />
                            </Box>
                        </Center>
                        <Box bg="white" boxShadow={"0 0 5px grey"} w={{ base: '100%', md: 400 }} >
                            <Stack p={3}>
                                <Title text={data.title} />
                                <Box maxH={200} overflowY="auto">
                                    <Text whiteSpace="pre-line"> {data.description} </Text>
                                </Box>
                                <Text as="b">{data.price} ₩</Text>
                                <Divider />
                                <Stack direction="row" alignItems="center">
                                    <AvatarUx />
                                    <Stack spacing={0}>
                                        <Text as="b"> {data.user.pseudo} </Text>
                                        <Text as="small" color="gray"> {dateParse(data.createdAt)} </Text>
                                    </Stack>
                                </Stack>
                                <Divider />
                                <Text as="b">Localisation :</Text>
                                <Text as="p" fontWeight="bold">
                                    <Localisation city={data.city} district={data.district} />
                                </Text>
                                <Box h={200} w={"100%"} maxW={"100%"}>
                                    <KakaoMap
                                        lat={data.district.latitude}
                                        lng={data.district.longitude}
                                        withCircle={true}
                                    />
                                </Box>
                                <Button colorScheme="messenger" leftIcon={<BsMessenger />}>Contacter le vendeur</Button>
                            </Stack>
                        </Box>
                    </Stack>
                </ModalContent>
            </Modal>
        </>
    )
}

const ProductDetail = () => {

    return (
        <Suspense fallback={<LoadingPage type="page" />}>
            <Detail />
        </Suspense>
    )
}

export default ProductDetail