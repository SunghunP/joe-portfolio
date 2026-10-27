import SkillCard from "./SkillCard";
import { SectionTitle } from "./Section";
import { skills } from "../data/skills";

export default function Skills() {
  return (
    <div>
      <SectionTitle>Skills</SectionTitle>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
        {skills.map((skill) => (
          <SkillCard key={skill.name} {...skill} />
        ))}
      </div>
    </div>
  )
}