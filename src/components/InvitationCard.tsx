"use client";
import { wedding } from "@/config/wedding";
import { titleCase } from "@/lib/format";
import { Corners, Divider } from "./Sprite";
import { useTilt } from "./useTilt";

export default function InvitationCard() {
  const tilt = useTilt<HTMLDivElement>(9, true);
  const t = wedding.text;
  return (
    <div className="card3d rv3d">
      <div className="card" ref={tilt}>
        <Corners />
        <div className="bis ar gold">{wedding.bismillah}</div>
        <p className="l1">{t.cardBlessing}</p>
        <p className="l2">{t.cardInvite}</p>
        <div className="role">{t.roleGroom}</div>
        <div className="name">{titleCase(wedding.groom)}</div>
        <div className="amp gold">&amp;</div>
        <div className="role">{t.roleBride}</div>
        <div className="name">{titleCase(wedding.bride)}</div>
        <Divider />
        <div className="journey">{t.journey}</div>
      </div>
    </div>
  );
}
