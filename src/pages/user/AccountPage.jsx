import {
	Avatar,
	Box,
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	InputAdornment,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Stack,
	TextField,
	Typography
} from "@mui/material";
import {
	DISLIKE_ICON,
	EDITNOTE_ICON,
	LIKE_ICON,
	PASSWORD_ICON,
	PROFIL_ICON
} from "../../utils/icon";
import TitleSectionText from "../../components/texts/TitleSectionText";
import { useAuthContext } from "../../contexts/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";
import { AVATAR_PATH, BEARER_HEADERS } from "../../utils/variables";
import React from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import {
	errorField,
	validationUpdatePassword,
	validationUpdatePseudo
} from "../../utils/formValidation";
import { vestResolver } from "@hookform/resolvers/vest";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { toast } from "react-toastify";
import { useConfirm } from "material-ui-confirm";

const CardPseudo = () => {
	const [open, setOpen] = React.useState(false);
	const { user, authentification } = useAuthContext();

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: vestResolver(validationUpdatePseudo)
	});



	const onSubmit = async (data) => {
		try {
			const response = await axios.post(
				`/users/edit/${user.id}`,
				{ pseudo: data.pseudo.trim() },
				BEARER_HEADERS
			);
			await authentification();
			reset();
			toast.success(response.data.message);
			setOpen(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<React.Fragment>
			<Card onClick={() => setOpen(true)}>
				<CardActionArea>
					<CardHeader
						title={<EDITNOTE_ICON sx={{ fontSize: 38 }} />}
					/>
					<CardContent>
						<Typography gutterBottom fontSize={16} component="div">
							Pseudo
						</Typography>
						<Typography
							gutterBottom
							fontSize={14}
							color="text.secondary"
							component="div"
						>
							Pas satisfait de votre pseudo ? modifiez-le
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
			<Dialog
				fullWidth
				open={open}
				onClose={() => {
					reset();
					setOpen(false);
				}}
				PaperProps={{
					component: "form",
					onSubmit: handleSubmit(onSubmit)
				}}
			>
				<DialogTitle>Modification du mot de passe</DialogTitle>
				<DialogContent>
					<TextField
						{...register("pseudo")}
						{...errorField(errors?.pseudo)}
						defaultValue={user?.pseudo}
						label="Pseudo"
						fullWidth
						placeholder="Votre nouveau pseudo"
						required
						margin="normal"
						InputProps={{
							endAdornment: (
								<InputAdornment
									className="string_count"
									position="end"
								>
									{watch("pseudo")?.length || 0}/{20}
								</InputAdornment>
							),
							inputProps: {
								maxLength: 20
							}
						}}
					/>
				</DialogContent>
				<DialogActions>
					<LoadingButton
						variant="contained"
						loading={isSubmitting}
						type="submit"
					>
						Valider
					</LoadingButton>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};

const CardPassword = () => {
	const [open, setOpen] = React.useState(false);
	const { user } = useAuthContext();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: vestResolver(validationUpdatePassword)
	});

	const onSubmit = async (data) => {
		try {
			const response = await axios.post(
				`/users/edit/${user.id}`,
				data,
				BEARER_HEADERS
			);
			reset();
			toast.success(response.data.message);
			setOpen(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<React.Fragment>
			<Card onClick={() => setOpen(true)}>
				<CardActionArea>
					<CardHeader
						title={<PASSWORD_ICON sx={{ fontSize: 38 }} />}
					/>
					<CardContent>
						<Typography gutterBottom fontSize={16} component="div">
							Mot de passe
						</Typography>
						<Typography
							gutterBottom
							fontSize={14}
							color="text.secondary"
							component="div"
						>
							Modifier son mot de passe pour renforcer la sécurité de
							votre compte
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
			<Dialog
				fullWidth
				open={open}
				onClose={() => {
					reset();
					setOpen(false);
				}}
				PaperProps={{
					component: "form",
					onSubmit: handleSubmit(onSubmit)
				}}
			>
				<DialogTitle>Modification du mot de passe</DialogTitle>
				<DialogContent>
					<TextField
						{...register("password")}
						{...errorField(errors?.password)}
						fullWidth
						margin="normal"
						label="Mot de passe"
						required
						placeholder="6+ caractères requis"
						type="password"
					/>
					<TextField
						{...register("password_confirmation")}
						{...errorField(errors?.password_confirmation)}
						fullWidth
						label="Confirmez votre mot de passe"
						required
						margin="normal"
						placeholder="6+ caractères requis"
						type="password"
					/>
				</DialogContent>
				<DialogActions>
					<LoadingButton
						variant="contained"
						loading={isSubmitting}
						type="submit"
					>
						Valider
					</LoadingButton>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};

const AccountPage = () => {
	const { user, setUser } = useAuthContext();

	const confirm = useConfirm();
	const navigate = useNavigate();

	const [isBusy, setIsBusy] = React.useState(false)

	const onDeleteAccount = () => {
		confirm({
			title: "Supprimer votre compte ?",
			description: `Attention cette action est ireversible.
		Si vous supprimé votre compte vos publications aunsi que vos commentaires resterons présent sur le site.
		`
		})
			.then(async () => {
				setIsBusy(true)
				const response = await axios.delete(
					`/users/${user.id}`,
					BEARER_HEADERS
				);
				toast.success(response?.data?.message);
				localStorage.removeItem("token");
				setUser(null);
				navigate("/login");
			})
			.catch((error) => {

			}).finally(() => {
				setIsBusy(false)
			})
	};

	return (
		<Container>
			<Stack alignItems="flex-start" my={5}>
				<Stack direction="row" alignItems="center" gap={1}>
					<Stack gap={1} direction="row" alignItems="center">
						<PROFIL_ICON />
						<TitleSectionText
							component="h1"
							startText="Mon"
							endText="compte"
						/>
					</Stack>
				</Stack>
				<List sx={{ mt: 2 }} disablePadding component="div">
					<ListItem disablePadding component="div">
						<ListItemAvatar sx={{ mr: 2 }}>
							<Avatar
								sx={{ width: 70, height: 70 }}
								src={AVATAR_PATH + user.avatar}
							/>
						</ListItemAvatar>
						<ListItemText
							primary={
								<React.Fragment>
									<Typography
										fontWeight="bold"
										component="span"
										fontSize={18}
									>
										{user.pseudo} •{" "}
									</Typography>
									<Typography component="span">
										{user.email}
									</Typography>
								</React.Fragment>
							}
							secondary={
								<NavLink
									to={`/user/profil/${user.slug}`}
									style={{
										fontSize: 18,
										fontWeight: "bold",
										textDecoration: "underline"
									}}
								>
									Aller au profil
								</NavLink>
							}
						/>
					</ListItem>
				</List>
				<Box mt={5} width="100%">
					<Typography component="span" gutterBottom fontWeight="bold">
						Mon activité
					</Typography>
					<Grid container spacing={3} mt={0}>
						<Grid item xs={12} sm={6} md={4}>
							<NavLink to="/mes-likes">
								<Card>
									<CardActionArea>
										<CardHeader
											title={<DISLIKE_ICON sx={{ fontSize: 38 }} />}
										/>
										<CardContent>
											<Typography
												gutterBottom
												fontSize={16}
												component="div"
											>
												J'aimes
											</Typography>
											<Typography
												gutterBottom
												fontSize={14}
												color="text.secondary"
												component="div"
											>
												Voir toutes les publications j'ai aimées
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</NavLink>
						</Grid>
					</Grid>
				</Box>
				<Box mt={5} width="100%">
					<Typography component="span" fontWeight="bold">
						Mettre à jour
					</Typography>
					<Grid container spacing={3} mt={0}>
						<Grid item xs={12} sm={6} md={4}>
							<CardPassword />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<CardPseudo />
						</Grid>
					</Grid>
				</Box>
				<Stack
					mt={10}
					justifyContent="center"
					alignItems="center"
					width="100%"
				>
					<Typography>Je souhaite supprimer mon compte</Typography>
					<LoadingButton
						loading={isBusy}
						onClick={onDeleteAccount}
						size="small"
						color="error"
					>
						supprimer mon compte
					</LoadingButton>
				</Stack>
			</Stack>
		</Container>
	);
};

export default AccountPage;
