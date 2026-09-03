import SkillCard from "./SkillCard";
import Kicker from './Kicker';
import { skills } from "../data/skills";

export default function Skills() {
  return (
    <div>
      <Kicker>Skills</Kicker>
      <h2 className="mt-2 text-2xl font-extra-bold tracking-tight text-ink sm:text-3xl">Tools I build with</h2>
      <p className="mt-2 max-w-[60ch] text-muted">
        Comfortable across the stack — from the raw government file to a shipped report.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
        {skills.map((skill) => (
          <SkillCard key={skill.name} {...skill} />
        ))}
      </div>
    </div>
  )
}