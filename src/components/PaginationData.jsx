import { Pagination, PaginationItem } from "@mui/material";
import PropTypes from "prop-types";
import { useFilterContext } from "../contexts/FilterProvider";

const PaginationData = ({ lastPage }) => {
	const { updateFilter, searchParams } = useFilterContext();

	return (
		<Pagination
			page={Number(searchParams.get("page")) || 1}
			onChange={(_event, value) =>
				updateFilter("page", value.toString())}
			count={lastPage || 0}
			variant="contained"
			renderItem={item => <PaginationItem {...item} />}
		/>
	);
};

PaginationData.propTypes = {
	lastPage: PropTypes.number.isRequired
};

export default PaginationData;