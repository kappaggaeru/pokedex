import { SettingCardProps } from "@/app/models/props/setting-card.props";
import { ReactNode } from "react";
import { SupportCardComponent } from "../card/support-card.component";

const arraySettings: SettingCardProps[] = [
	{
		title: "buy me a coffee"
	}
];

const supports = arraySettings.map((e, index) => (
	<SupportCardComponent key={index} title={e.title} />
));

export const SupportComponent: ReactNode = (
	<div className="flex flex-col gap-4">
		{supports}
	</div>
)