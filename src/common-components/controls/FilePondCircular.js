// Material-Ui imports
import { makeStyles } from "@material-ui/core";

// FilePond imports
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

const mimiTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif", "video/mp4"];
registerPlugin(FilePondPluginImagePreview);

// styles
const useStyles = makeStyles((theme) => ({
	root: {
		border: "1px solid #444",
		marginBottom: 0,

		"&.small": {
			width: 100,
			height: 100,
			"& .filepond--item": {
				width: 80,
				height: 80,
				top: -7,
				left: -7,
			},
		},

		"&.medium": {
			width: 150,
			height: 150,
			"& .filepond--item": {
				width: 120,
				height: 120,
				top: -1,
				left: -3.5,
			},
		},

		"& .filepond--panel-root": {
			background: "none",
		},
	},
}));

function FilePondCircular(props) {
	const classes = useStyles();

	// destructuring through props
	const { onAddFile, label, rootClassName, size = "small" } = props;

	return (
		<FilePond
			stylePanelLayout="circle"
			className={`${rootClassName} ${classes.root} ${size}`}
			acceptedFileTypes={mimiTypes}
			onaddfile={onAddFile}
			labelIdle={label}
			credits={{ label: "" }}
		/>
	);
}

export default FilePondCircular;
