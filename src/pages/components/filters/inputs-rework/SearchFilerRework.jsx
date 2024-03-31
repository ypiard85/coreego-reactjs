import { Button, Dialog, IconButton, TextField } from "@mui/material";
import React from "react";
import { useFilterContext } from "../../../../contexts/FilterProvider";
import { SEARCH_ICON } from "../../../../utils/icon";

const SearchFilterRework = () => {
	const { updateFilter, searchParams } = useFilterContext();
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState('');

    React.useEffect(() => {
        setValue(searchParams.get('q') || '')
    }, [searchParams.get('q')])

	return (
		<>
			<Button
				onClick={() => setOpen(true)}
				startIcon={<SEARCH_ICON />}
				// sx={{ textTransform: "inherit" }}
			>
				{searchParams.get("q") || ' '}
			</Button>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				fullWidth
				PaperProps={{
					component: "form",
					onSubmit: (e) => {
						e.preventDefault();
						const element = e.target;
						updateFilter("q", element.q.value);
                        setOpen(false)
					}
				}}
			>
				<TextField
					fullWidth
					value={value}
                    type="search"
					placeholder="Rechercher..."
					id="q"
					name="q"
					onChange={(e) => setValue(e.target.value)}
					InputProps={{
						startAdornment: (
							<SEARCH_ICON
								sx={{ color: "var(--coreego-blue)", mr: 2 }}
							/>
						)
					}}
				/>
			</Dialog>
		</>
	);
};

export default SearchFilterRework;
