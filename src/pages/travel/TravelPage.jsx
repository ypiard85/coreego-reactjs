import React from "react";
import { useSelector } from "react-redux";
import HEADER_IMG from "../../images/headers/espace-discussion.jpg";
import { useFilterContext } from "../../contexts/FilterProvider";
import CityDistrictSelectInput from "../../components/inputs/CityDistrictSelectInput";
import { NavLink, useLocation } from "react-router-dom";
import {
	CLOSE_ICON,
	FILTER_ICON
} from "../../utils/icon";
import {
	Box,
	Container,
	Grid,
	Typography,
	Button,
	Pagination,
	Stack,
	Hidden,
	Select,
	Dialog,
	DialogTitle,
	IconButton,
	DialogContent,
    PaginationItem
} from "@mui/material";
import useSWR from "swr";
import LoadingPage from "../../components/LoadingPage";
import PlaceCard from "../../components/card/PlaceCard";
import { MenuItem } from "@chakra-ui/react";
import SearchInput from "../../components/inputs/SearchInput";
import HeroBannerFeed from "../components/templates/HeroBannerFeed";
import PaginationData from "../../components/PaginationData";

const SwrData = ({ places }) => {
	return (
		<Box my={5}>
			<Container>
				{places.length
					? <Grid container spacing={2}>
							{places.map(place => {
								return (
									<Grid key={place.id} item xs={12} md={4}>
										<NavLink to={`/voyage/place/${place.slug}`}>
											<PlaceCard place={place} />
										</NavLink>
									</Grid>
								);
							})}
						</Grid>
					: <Typography textAlign="center">
							Aucune lieu trouvé
						</Typography>}
			</Container>
		</Box>
	);
};

const TravelPage = () => {
	const { placeCategories, cities } = useSelector(state => state.app);

	const [isOpenFilterModal, setIsOpenFilterModal] = React.useState(
		false
	);

	const { updateFilter, searchParams } = useFilterContext();
	const location = useLocation();

	const { data: places, isLoading, error } = useSWR(
		`/places${location.search}`
	);

	if (error) console.error("API ERROR:", error);

	return (
		<React.Fragment>
			<HeroBannerFeed
				theme="red"
				titleFr="Voyage"
				titleKr="여행"
				description="
				MACC Essentials has an important role in making
				supplies and services available to customers and
				their patients during this critical time. This
				includes services from various domains. Our aim is
				to aid you. As much we can.
				"
				imageLink={HEADER_IMG}
				buttonLabel="Partager un lieu"
				buttonLink="/"
				imageDirection="end"
			/>
			{/* <Box className="hero_banner">
				<Container>
					<Grid container alignItems="center">
						<Grid item xs={12} md={6}>
							<Stack
								maxWidth="100%"
								spacing={2}
								alignItems="flex-start"
							>
								<Stack spacing={2}>
									<Stack
										direction="row"
										alignItems={"baseline"}
										gap={2}
										flexWrap="wrap"
									>
										<Typography
											variant="h3"
											color="var(--coreego-blue)"
											fontWeight="bold"
											component="h1"
										>
											Voyage
										</Typography>
										<Typography
											variant="h4"
											fontWeight="bold"
											component="span"
											color="var(--coreego-red)"
										>
											여행
										</Typography>
									</Stack>
									<Typography color="var(--grey-bold)">
										MACC Essentials has an important role in making
										supplies and services available to customers and
										their patients during this critical time. This
										includes services from various domains. Our aim is
										to aid you. As much we can.
									</Typography>
								</Stack>
								<Button
									color="error"
									variant="contained"
									startIcon={<ADD_ICON />}
								>
									Partager un lieu
								</Button>
							</Stack>
						</Grid>
						<Grid
							item
							xs={12}
							md={6}
							justifyContent="flex-end"
							sx={{ display: { xs: "none", md: "flex" } }}
						>
							<img
								height={350}
								width={350}
								style={{
									boxShadow: "20px 20px 4px var(--coreego-red)",
									marginRight: 20,
									marginBottom: 20,
									borderRadius: 5,
									objectFit: "cover",
									objectPosition: "center"
								}}
								src={HEADER_IMG}
								alt=""
							/>
						</Grid>
					</Grid>
				</Container>
			</Box> */}

			<Box>
				<Container>
					<Hidden smDown>
						<Stack
							direction="row"
							alignItems="flex-start"
							gap={2}
							flexWrap="wrap"
						>
							<SearchInput
								placeholder="Rechercher une discussion..."
								sx={{
									width: 300,
									maxWidth: "100%",
									backgroundColor: "white"
								}}
								defaultValue={searchParams.get("q")}
								onChange={value => updateFilter("q", value)}
							/>
							<Select
								sx={{
									width: "fit-content",
									backgroundColor: "white"
								}}
								placeholder="Catégorie"
								value={searchParams.get("category") || "0"}
								onChange={category =>
									updateFilter(
										"category",
										category.target.value.toString()
									)}
							>
								<MenuItem value="0"> Toutes les catégories </MenuItem>
								{placeCategories.map(category => {
									return (
										<MenuItem key={category.id} value={category.id}>
											{" "}{category.label}{" "}
										</MenuItem>
									);
								})}
							</Select>
							<Box>
								<CityDistrictSelectInput
									cityValue={searchParams.get("city") || "0"}
									districtValue={searchParams.get("district") || "0"}
									updateCity={e => updateFilter("city", e.toString())}
									updateDistrict={e =>
										updateFilter("district", e.toString())}
								/>
							</Box>
						</Stack>
					</Hidden>
					<Hidden smUp>
						<Box>
							<Button
								fullWidth
								onClick={() => setIsOpenFilterModal(true)}
								variant="outlined"
								startIcon={<FILTER_ICON />}
							>
								Filtres
							</Button>
							<Dialog
								onClose={() => setIsOpenFilterModal(false)}
								open={isOpenFilterModal}
							>
								<DialogTitle display="flex" alignItems="center">
									<FILTER_ICON sx={{ mr: 2 }} /> Filtres{" "}
								</DialogTitle>
								<IconButton
									aria-label="close"
									onClick={() => setIsOpenFilterModal(false)}
									sx={{
										position: "absolute",
										right: 8,
										top: 8
									}}
								>
									<CLOSE_ICON />
								</IconButton>
								<DialogContent dividers>
									<Stack direction="row" gap={2} flexWrap="wrap">
										<SearchInput
											fullWidth
											placeholder="Rechercher une discussion..."
											defaultValue={searchParams.get("q")}
											onChange={value => updateFilter("q", value)}
										/>
										<Select
											fullWidth
											placeholder="Catégorie"
											value={searchParams.get("category") || "0"}
											onChange={category =>
												updateFilter(
													"category",
													category.target.value.toString()
												)}
										>
											<MenuItem value="0">
												{" "}Toutes les catégories{" "}
											</MenuItem>
											{placeCategories.map(category => {
												return (
													<MenuItem
														key={category.id}
														value={category.id}
													>
														{" "}{category.label}{" "}
													</MenuItem>
												);
											})}
										</Select>
										<Box sx={{width: '100%'}}>
											<CityDistrictSelectInput
												cityValue={searchParams.get("city") || "0"}
												districtValue={
													searchParams.get("district") || "0"
												}
												updateCity={e =>
													updateFilter("city", e.toString())}
												updateDistrict={e =>
													updateFilter("district", e.toString())}
											/>
										</Box>
									</Stack>
								</DialogContent>
							</Dialog>
						</Box>
					</Hidden>
				</Container>
			</Box>
            {isLoading
				? <LoadingPage type="data" />
				: <SwrData places={places.data} />}
			<Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
                <PaginationData lastPage={places?.meta.last_page}  />
			</Box>
		</React.Fragment>
	);
};

export default TravelPage;