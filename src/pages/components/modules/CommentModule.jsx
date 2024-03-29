import CommentCard from "../../../components/card/CommentCard";
import { useMemo } from "react";
import { apiFetch } from "../../../http-common/apiFetch";
import { SubmitHandler, useForm } from "react-hook-form";
import { noEmptyValidator } from "../../../utils/formValidation";
import {
	Box,
	FormControl,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Stack,
	TextField,
	Typography,
	InputLabel,
	FormHelperText,
	InputBase
} from "@mui/material";
import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import TitleSectionText from "../../../components/texts/TitleSectionText";
import axios from "axios";
import { BEARER_HEADERS } from "../../../utils/variables";

const CommentModule = ({
	comments,
	discussionId = null,
	placeId = null,
	mutate
}) => {
	const [open, setOpen] = React.useState(false);

	const commentList = useMemo(() => {
		return comments.sort((a, b) => {
			return (
				new Date(b.created_at).getTime() -
				new Date(a.created_at).getTime()
			);
		});
	}, [comments]);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting }
	} = useForm({
		mode: "onTouched"
	});

	const onSubmit = async (data) => {
		try {
			const response = await axios.post('/comments',{
				discussion_id: discussionId,
				place_id: placeId,
				content: data.content
			}, BEARER_HEADERS)

			toast.success(response.data.message);

			reset();
			mutate();
			setOpen(false);
		} catch (error) {
			toast.success(error?.data?.message);
		}
	};

	return (
		<Box>
			<Container>
				<Stack spacing={2}>
					<TitleSectionText
						startText="écrire un"
						endText="commentaire"
					/>
					<Box onClick={() => setOpen(true)}>
						<TextField
							sx={{ zIndex: -1 }}
							fullWidth
							placeholder="Ce que je veux dire..."
						/>
					</Box>
					{commentList.length ? (
						<Stack spacing={1}>
							{commentList.map((comment) => {
								return (
									<CommentCard
										mutate={mutate}
										key={comment.id}
										comment={comment}
									/>
								);
							})}
						</Stack>
					) : (
						<></>
					)}
				</Stack>
			</Container>
			<Dialog
				open={open}
				maxWidth="md"
				onClose={() => setOpen(false)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					Ajouter un commentaire
				</DialogTitle>
				<DialogContent>
					<Stack component="form" onSubmit={handleSubmit(onSubmit)}>
						<FormControl
							variant="standard"
							fullWidth
							sx={{ width: 500, maxWidth: "100%" }}
						>
							<TextField
								error={errors.content ? true : false}
								autoFocus
								placeholder="Ecrivez votre commentaire..."
								required
								multiline
								rows={10}
								{...register("content", { ...noEmptyValidator })}
							/>
							{errors.content && (
								<FormHelperText id="component-error-text">
									{errors.content.message}
								</FormHelperText>
							)}
						</FormControl>
						<Stack direction="row" sx={{ mt: 3 }}>
							<LoadingButton loading={isSubmitting} type="submit">
								Envoyer
							</LoadingButton>
							<Button onClick={() => setOpen(false)}>Annuler</Button>
						</Stack>
					</Stack>
				</DialogContent>
			</Dialog>
		</Box>
	);
};

export default CommentModule;
