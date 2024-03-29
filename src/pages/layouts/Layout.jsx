import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthProvider";
import LoadingPage from "../../components/LoadingPage";
import { useDispatch } from "react-redux";
import {
	initCities,
	initDiscussionCategories,
	initPlaceCategories,
	initLanguages
} from "../../store/reducers/app.reducer";
import Navigation from "../../components/navigation/Navigation";
import { apiFetch } from "../../http-common/apiFetch";
import axios from "axios";
import { TOKEN } from "../../utils/variables";
import DashboardLayout from "./DashboardLayout";
import { useLocation } from "react-router";

const Layout = ({ children }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const dispath = useDispatch();
	const { authentification } = useAuthContext();

	const location = useLocation();

	useEffect(() => {
		onLoadedApplication();
	}, []);

	const onLoadedApplication = async () => {
		try {
			const application = await axios.get("/start-application");

			dispath(
				initDiscussionCategories(
					application.data.discussion_categories
				)
			);
			dispath(initPlaceCategories(application.data.place_categories));
			dispath(initCities(application.data.cities));
			dispath(initLanguages(application.data.languages));

			if (TOKEN) {
				await authentification();
			}
		} catch (error) {
			console.error(error.message);
		} finally {
			setIsLoaded(true);
		}
	};

	return isLoaded ? (
		<>
			{location.pathname.startsWith("/dashboard") ? (
				<DashboardLayout>{children}</DashboardLayout>
			) : (
				<>
					<Navigation />
					{children}
				</>
			)}
		</>
	) : (
		<LoadingPage type="app" />
	);
};

export default Layout;
