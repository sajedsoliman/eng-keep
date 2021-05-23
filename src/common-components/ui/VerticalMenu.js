<div className={`${classes.verticalMenu} flex flex-col items-center`}>
	<Slide in={addWordMenuOpen} direction="up">
		{/* action button */}
		<div className="bg-white p-1rounded-lg mb-3">
			<Fab color="secondary">
				<PlusCircleIcon className="h-8" />
			</Fab>
			{/* <div className={`word-addition-menu ${classes.alanBtnWrapper}`}></div> */}
		</div>
	</Slide>

	<Fab className={classes.verticalMenuToggler} onClick={toggleWordAdditionMenu}>
		<IF condition={!addWordMenuOpen} elseChildren={<XIcon className="h-7" />}>
			<DotsCircleHorizontalIcon className="h-9" />
		</IF>
	</Fab>
</div>;
