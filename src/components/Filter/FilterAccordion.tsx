import { PropsWithChildren } from "react"

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"

interface IProps {
	summary: string
}

export default function FilterAccordion({ summary, children = null }: PropsWithChildren<IProps>) {
	return (
		<Accordion>
			<AccordionSummary>{summary}</AccordionSummary>
			<AccordionDetails>{children}</AccordionDetails>
		</Accordion>
	)
}
