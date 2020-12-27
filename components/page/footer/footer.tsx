import { container } from "@/components/container/container";
import { Border, DivPx } from "@moai/core";
import { Logo } from "../header/logo/logo";
import s from "./footer.module.css";

const links = [
	{
		heading: "Liquid",
		links: [
			["Liquid.com", "https://liquid.com"],
			["About Liquid", "https://www.liquid.com/company"],
			["Help Centre", "https://help.liquid.com/"],
		],
	},
	{
		heading: "Explorer",
		links: [
			["Source Code", "https://github.com/dvkndn/liquid-explorer"],
			["Issues Tracker", "https://github.com/dvkndn/liquid-explorer/issues"],
		],
	},
	{
		heading: "Developers",
		links: [
			["Chain API", "https://documenter.getpostman.com/view/6671645/TVK75f8B"],
			["Surf API", "https://documenter.getpostman.com/view/6671645/TVmHEf6x"],
		],
	},
];

export const PageFooter = () => (
	<div className={container.max960}>
		<Border color="weak" />
		<div className={s.container}>
			<div className={s.main}>
				<Logo />
                <DivPx size={16} />
				<p>© Quoine Pte. Ltd.</p>
			</div>
			{links.map((group) => (
				<div className={s.group} key={group.heading}>
					<p className={s.heading}>{group.heading}</p>
					<ul>
						{group.links.map((link) => (
							<div className={s.row} key={link[0]}>
								<a
									className={s.link}
									href={link[1]}
									target="_blank"
									children={link[0]}
									rel="noopener"
								/>
							</div>
						))}
					</ul>
				</div>
			))}
		</div>
	</div>
);
