interface DatePickerOptions {
	selectsRange?: boolean;
	withPortal?: boolean;
	inline?: boolean;
	isClearable?: boolean;
	minDate?: Date;
	maxDate?: Date;
	selected?: Date;
	onSelect?: (date: Date) => void;
}

export interface CalendarProps {
	startDate: Date;
	endDate?: Date;
	handleChangeDate: (dates: [Date, Date]) => void;
	datePickerOptions: DatePickerOptions;
}
