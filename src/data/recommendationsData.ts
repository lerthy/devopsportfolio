export interface RecommendationLetter {
  id: string
  recommenderName: string
  recommenderTitle: string
  date: string
  body: string // Full letter text
  snippet: string // Short quote for previews/hover
  pdfUrl?: string // Optional PDF file path in public folder
  relatedStopId?: string // Optional link to journey stop
  relatedStopIds?: string[] // If multiple stops relevant
}

export const recommendations: RecommendationLetter[] = [
  // Add your recommendation letters here
  // Example structure:
  {
    id: 'recommendation-1',
    recommenderName: 'Wren Priest',
    recommenderTitle: 'Software Engineer II, Amazon',
    date: '2025-11-10',
    body: `To Whom It May Concern,
I am writing to provide a professional recommendation for Lerdi Salihi. I served as a mentor for
Lerdi's team when he participated in the global 2025 Amazon University Engagement Program.
During the program, I provided technical guidance to Lerdi and his team as they developed a
full-stack web application for appointment scheduling and management. The team architected
and built a front-end, serverless back-end, SQL database, and an AI/LLM scheduling assistant.
With Lerdi's leadership and strong technical vision, the team earned second place in the
program during the final awards ceremony. This was no small feat considering more than 50
international teams participated in the program!
Through our weekly check-ins and regular emails, I noticed Lerdi's leadership. He directed the
team, and he did an excellent job presenting and communicating the project's technical merits.
He takes an iterative yet proactive approach to technical communication. When Lerdi worked
with me to create a high-level system design diagram, he was quick to incorporate feedback into
future revisions. He seeks out competing perspectives which is a valuable trait in any field.
His strongest traits may be his perseverance and resiliency. Whenever problems occurred, Lerdi
was quick to devise a solution with the team. When some team members dropped from the
program for personal reasons, he reaffirmed his commitment to completing the program and
his team's project. The project would not have succeeded without his perseverance.
In summary, Lerdi is a capable and responsive leader. He handled pressure well and delivered a
successful project. I am confident he would be a valuable asset to any team. I give Lerdi my
professional recommendation.
Please feel free to contact me if you require additional information.
Sincerely,
Wren Priest
Software Engineer II, Amazon`,
    snippet: 'With Lerdi\'s leadership and strong technical vision, the team earned second place in the program',
    pdfUrl: '/Recommendation Letter for Lerdi Salihi.pdf',
    relatedStopId: 'prishtina',
  },
  {
    id: 'recommendation-2',
    recommenderName: 'Floris Maathuis',
    recommenderTitle: 'Coordinator, Lecturer and Coach, Minor Future of Technology and Society, Hanze University',
    date: '2023',
    body: `Letter of recommendation for Lerdi Salihi

Dear,

The past semester I have guided Lerdi as an exchange student in the Minor Future of Technology and Society (FTS) at Hanze University of applied sciences in Groningen.

With a group of students we explored the future, in a multidisciplinary, international environment where students interacted with different stakeholders and other disciplines across the Hanze. Students formed their own vision on the future of the chosen topic and created creative and artistic concepts and technical prototypes to address societal challenges of the future.

During this semester I have get to know Lerdi as a talented, enthusiastic and creative student with a great drive to move forward towards meaningful results. Besides that he is also a team player that involves and inspires the project groups he worked in to together get to the best end result. In this process he is not afraid to think and act out of the box and take other on this path with him.

What I value a lot in Lerdi is the amazing number of creative ideas he generates and his drive to also actually build these ideas. With his group, together with the Province of Groningen he created a prototype to more involve young people into local democracy by representing societal problems as monsters that can be tagged and fought together. A very clever and creative merging of democracy and Pokémon Go. In this process he learned a lot of new skills, like 3D design, SCRUM, different communication forms and building augmented reality applications.

One of the best memories I have of the past semester is Lerdi playing a mad scientist to make the audience engage a speculative direct democracy concept they came up with, stealing the hearts of the audience. Showing that het dares to stand up and do an extra step outside his comfort zone to learn new things and engage other people.

To conclude, I would recommend Lerdi for any environment, organization or company where result driven creative thinking, concepting and creation is important and where being a team player and exploring new possibilities are key value. I'm convinced that you will love working with him!

With kind regards,

Floris Maathuis
Coordinator, lecturer and coach
Minor Future of Technology and Society, Creative Media and Game Technologies Program, Hanze University of applied sciences, Groningen, The Netherlands`,
    snippet: 'Talented, enthusiastic and creative student with a great drive towards meaningful results',
    pdfUrl: '/Lerdi letter of recommendation.pdf',
    relatedStopId: 'netherlands',
  },
  {
    id: 'recommendation-3',
    recommenderName: 'Nick Lumatalale',
    recommenderTitle: 'Senior Lecturer, Hanze University of Applied Sciences, Minor Future of Technology and Society',
    date: '2025-02-10',
    body: `To Whom It May Concern,

I am writing to lend my support for Lerdi Salihi to further his studies at your institute.

I highly recommend Lerdi because he is an intelligent student. He has demonstrated the ability to work with various methods of futures thinking, considering different perspectives and coming up with original, novel ideas. Through various assignments in my course, Lerdi delved into sense-making and futures literacy. By questioning existing assumptions, including his own, he learned what it means to create and develop for emergence.

Furthermore, Lerdi is solid, self-disciplined, and shows a high eagerness to learn. He is open to stepping out of his comfort zone, for instance, by applying insights from other domains such as philosophy and technology.

Moreover, I have found Lerdi to be a student with excellent analytical and communication skills, both in speech and writing.

Last but not least, Lerdi is a pleasure to work with.

Should you have any questions, please do not hesitate to contact me via email or phone: n.b.o.lumatalale@pl.hanze.nl, +31 50-595 5483.

Sincerely,

Nick Lumatalale
Senior Lecturer Hanze UAS
BSc Creative Media & Game Technologies
Minor Future of Technology and Society`,
    snippet: 'Intelligent student with excellent analytical and communication skills, open to stepping out of his comfort zone',
    pdfUrl: '/Recommandation1.pdf',
    relatedStopId: 'netherlands',
  },
]

// Helper function to get recommendations for a specific journey stop
export function getRecommendationsForStop(stopId: string): RecommendationLetter[] {
  return recommendations.filter(
    (rec) =>
      rec.relatedStopId === stopId ||
      (rec.relatedStopIds && rec.relatedStopIds.includes(stopId))
  )
}

