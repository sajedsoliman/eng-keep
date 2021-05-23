// filepond
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);

export default function FilePondUploader(props) {
	const {
		needEncode = true,
		imagePreview = true,
		needMulti = false,
		imgReviewMinHeight = 10,
		imgReviewMaxHeight = 256,
		filepondRef,
		files,
		onInit,
		onAddFileHandler,
		onFilesUpdated,
		wrapperClassName,
		allowedTypes,
		...others
	} = props;

	return (
		<div className={wrapperClassName}>
			<FilePond
				allowImagePreview={imagePreview}
				ref={filepondRef}
				imagePreviewMinHeight={imgReviewMinHeight}
				imagePreviewMaxHeight={imgReviewMaxHeight}
				allowFileEncode={needEncode}
				allowMultiple={needMulti}
				acceptedFileTypes={allowedTypes}
				credits={{ label: "dasdsads" }}
				onaddfile={onAddFileHandler}
				onupdatefiles={onFilesUpdated}
				oninit={onInit}
				{...others}
			/>
		</div>
	);
}
