import SkillCard from "./SkillCard";
import { skills } from "../data/skills";

export default function Skills() {
  return (
    <div>
      <h2 className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">Skills</h2>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
        {skills.map((skill) => (
          <SkillCard key={skill.name} {...skill} />
        ))}
      </div>
    </div>
  )
}