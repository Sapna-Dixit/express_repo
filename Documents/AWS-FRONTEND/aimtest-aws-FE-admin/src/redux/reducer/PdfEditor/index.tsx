import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  displayPrint: true,
  pdfInitalValue: `
<div>
<div>
   <div class='rela-page'>
      <div class='px-0'>
         <div size='A4'>
            <img
            // width="200px"
            // height="800px"
            class='big-img'
            src='https://res.cloudinary.com/dgimekhep/image/upload/v1665566741/101_lm8fum.jpg'
            />
         </div>
      </div>
   </div>
</div>
<div>
   <div class='rela'>
      <div class='px-0'>
         <div size='A4'>
            <img
            // width="200px"
            // height="800px"
            class='third-img'
            src='https://res.cloudinary.com/dgimekhep/image/upload/v1666957073/a4_11_02_hjk3rl.jpg'
            />
         </div>
      </div>
      <div class='row'>
         <div class='col-12'>
            <div class='text-absolute'>
               <div class='logo-text'>
                  <div>
                     <div class='top-space'>
                        <div class='img-center'>
                           <img
                              class='logo'
                              src='https://res.cloudinary.com/dafit69de/image/upload/v1664269377/aim-test/logo_mhgnlb.png'
                              />
                           <div class='heading-pdf'>
                              <h3 class='top-heading'>AIMTEST</h3>
                           </div>
                        </div>
                        <div class='img-center'>
                           <h1 class='margin'>
                              Where AIM is Shaped And Goals are Achieved
                           </h1>
                           <h1 class='top-heading'>AIM Test Assessment Report</h1>
                        </div>
                     </div>
                     <div class='left-space'>
                        <div class='top-space-sec'>
                           <div class='text-space'>
                              <h2 class='margin-text'>Name of Student </h2>
                              <h2 class='detail-text'></h2>
                           </div>
                           <div class='text-space'>
                              <h2 class='margin-text'>Class </h2>
                              <h2 class='detail-text'></h2>
                           </div>
                           <div class='text-space'>
                              <h2 class='margin-text'>Date Of Birth </h2>
                              <h2 class='detail-text'></h2>
                           </div>
                           <div class='text-space'>
                              <h2 class='margin-text'>Contact Number  </h2>
                              <h2 class='detail-text'></h2>
                           </div>
                           <div class='text-space'>
                              <h2 class='margin-text'>Adress </h2>
                              <h2 class='detail-text'></h2>
                           </div>
                           <div class='text-space'>
                              <h2 class='margin-text'>Email </h2>
                              <h2 class='detail-text'></h2>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div>
   <div class='rela'>
      <div class='px-0'>
         <div size='A4'>
            <img
            // width="200px"
            // height="800px"
            class='third-img'
            src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
            />
         </div>
      </div>
      <div class='row'>
         <div class='col-12'>
            <div class='text-absolute'>
               <div class='logo-text'>
                  <div>
                     <div class='heading-pdf'>
                        <h3 class='top-heading'>Contents</h3>
                     </div>
                     <div class='text-space'>
                        <p class='text-content'>1. Preface</p>
                     </div>
                     <div class='text-space'>
                        <p class='text-content'>2. The Significance Of Aim In Life</p>
                     </div>
                     <div class='text-space'>
                        <p class='text-content'>3. Aim Test</p>
                     </div>
                     <div class='text-space'>
                        <p class='text-content'>4. Advantages Of AIMTEST</p>
                     </div>
                     <div class='text-space'>
                        <p class='text-content'>5. Autheniticity Of AIMTEST</p>
                     </div>
                     <div class='text-space'>
                        <p class='text-content'>6. What is CRMGS?</p>
                     </div>
                     <div class='text-space'>
                        <p class='text-content'>7. CRMGS Report</p>
                     </div>
                     <div class='text-space'>
                        <p class='text-content'>8. Evalution Parameters</p>
                     </div>
                     <div class='text-space'>
                        <p class='text-content'>9. SWOT Analysis</p>
                     </div>
                     <div class='text-space'>
                        <p class='text-content'>10. SWOT Analysis Report</p>
                     </div>
                     <div class='text-space'>
                        <p class='text-content'>11. What is Multiple Intelligence</p>
                     </div>
                     <div class='text-space'>
                        <p class='text-content'>12. Multiple Intelligence Report</p>
                     </div>
                     <div class='text-space'>
                        <p class='text-content'>13. The Learning Style</p>
                     </div>
                     <div class='text-space'>
                        <p class='text-content'>14. Learning Style Report</p>
                     </div>
                     <div class='text-space'>
                        <p class='text-content'>15. Thinking Style</p>
                     </div>
                     <div class='text-space'>
                        <p class='text-content'>16. Thinking Style Report</p>
                     </div>
                     <div class='text-space'>
                        <p class='text-content'>17. Personality Type</p>
                     </div>
                     <div class='text-space'>
                        <p class='text-content'>18. Personality Type Report</p>
                     </div>
                     <div class='text-space'>
                        <p class='text-content'>19. Importance of Career Options</p>
                     </div>
                     <div class='text-space'>
                        <p class='text-content'>20. Career Options For Various Fields</p>
                     </div>
                     <div class='text-space'>
                        <p class='text-content'>21. Evalution Of Career Options</p>
                     </div>
                     <div class='text-space'>
                        <p class='text-content'>22. Disclaimer</p>
                     </div>
                     <div class='text-space'>
                        <p class='text-content'>23. Warning</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <div class='heading-pdf'>
                     <h3 class='top-heading'>Preface</h3>
                  </div>
                  <h3>PREFACE</h3>
                  <p class='text-style'>
                     For eternity we pay our gratitude to the Almighty God who inculcated in us the curiosity to
                     learn and serve humanity through our knowledge and using best of our abilities. ‘AIMTEST’
                     assessment report is not the end or conclusion of our tasks but it is one of the milestones of
                     our journey towards educational research. We look forward to consistent and continuous
                     improvements in our present assessment work.<br>.<br>
                     This assessment is not only about testing the knowledge, but also memory power,
                     concentration, reading speed and overall social and educational behavior. Apart from this,
                     some other learning abilities can also be analyzed by the several aspects. This assessment
                     report discusses about various elements that are discussed in seven different sections. 
                     <span class='bold-style'>  Our
                     most promising work in designing this whole project is the optimum calculation of
                     concentration level and study potential by using research based formulas.</span>
                     Adding to
                     this another major achievement of AIMTEST assessment is, one would know the reason behind
                     low, medium or high scores in overall result.<br>.<br>
                     Furthermore, this assessment provides an opportunity to get aware of one’s various learning
                     abilities, general interests and subjects’ interest. This in turn would help in career guidance.
                     The depth of this assessment provides an opportunity for us to focus on individuals’ important
                     aspect called education. In education, the ethnicity and psycho-social aspects built by learners
                     and adapted by the students are robustly attached.<br>.<br>
                     The psychological and behavioral understanding will enable the candidate to become socially
                     sound and active. In this manner, the fundamental concept of this assessment report is to
                     analyze the overall personality of student and thereby enable them to take proper decisions
                     related to their education and career.<br>.<br>
                     This assessment and research would not have been accomplished without the contribution of
                     the parties and individuals who were directly or indirectly associated with the research for this
                     assessment. We would like to express our sincere gratitude to all the supervisors, advisory
                     boards, teachers, parents and students who participated in the assessment report and
                     research of ”AIMTEST”. This report would constantly need insights in terms of suggestions and
                     constructive criticism.
                     Journey of miles is covered by taking steps forward, no matter how small the steps are. It’s just
                     a start. We have a long way to go. We hope this assessment report helps the readers to
                     understand our mission.
                     Research Team
                  </p>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <div class='sign-heading'>
                     <h6 class='top-heading'>The Significance of Aim in Life</h6>
                     <p class='bold-style'>"A man without an Aim is like a ship without a compass.”</p>
                  </div>
                  <br><br>
                  <div class='img-center'>
                     <img
                        class='signification-img'
                        src='https://res.cloudinary.com/dgimekhep/image/upload/v1665386825/Untitled-2_1_tkvwkl.png'
                        />
                     <div class='heading-pdf'>
                     </div>
                     <br><br>
                     <p class='text-style'>
                        A ship without a compass means it cannot reach to a particular destination due to the
                        lack of direction; similarly aim plays a vital role in everyone’s life because it directs our
                        life to a destination. The people having an Aim get a definite success in life. Therefore a
                        life without an aim is meaningless. In recent times we can see several people are
                        engaged in social media and find many of the successful people, they start following
                        them but unable to succeed because they don’t know their own talent. The results are
                        difficult and stressful life, anxiety, depression and many more problems thereby losing
                        the focus, self-confidence, hope and most important concentration.<br><br>
                        Once the aim of life is set the human brain starts formulating the ways to achieve it.
                        Repeatedly our thoughts and efforts are channelized in that direction to reach at the
                        destination or target. Sometimes following that path makes us exhausted due to
                        obstacles and we discover that our target is hard to achieve. This is the point where life
                        begins to get challenges and testing at several parameters like confidence, patience,
                        understanding, learning, thinking, and at various quotients etc. Hence the AIMTEST
                        introduces here, to cope with these parameters and observe the significance of various
                        aspects and interests to get the right career choice. With the help of AIMTEST people can
                        survive at difficult times by getting knowledge about their overall abilities and how to
                        overcome with their weak points.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>AIMTEST</h1>
                  </div>
             
                  <div class='img-center'>
                     
                     <p class='text-style'>
                        AIMTEST encourage the extreme desire of achieving aim and their solution replenishes
                        with improved self-confidence, optimism, memory power, concentration and enthusiasm
                        which helps to regain the positive energy to fight back and throwing a challenge towards
                        life to achieve the aim. Because nobody knows you better than you and you are more
                        capable of more than you know.<br><br>
                        So, never stop fighting until you arrive at your destined place - that is, the unique you.
                        Have an aim in life, continuously acquire knowledge, work hard, and have perseverance
                        to realize the great life.<br><br>
                        In the 21st century each individual has a lot of different abilities such as cognition and
                        application of different ways of thinking, research, problem solving, critical thinking skills
                        and creativity. According to the great mathematician Srinivasa Ramanujan, everyone has
                        their own unique pattern, for understanding, we can observe the leaves of a plant so we
                        can easily determine the different patterns of individual plants and leaves. Similarly,
                        every human being is distinctive and follows a certain pattern in each aspect of
                        development, growth and thinking. If we consider the human behavior, every human has
                        their own pattern of thinking on the basis of his/her thinking ability he/she takes the
                        decision. Each one has different forms of learning, thought and analysis that go beyond
                        the memorization and recall of information and facts.<br><br>
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div class='top-space'>
                  <div class='img-center mt-5'>
                     <p class='text-style'>
                        Consequently, after exploring several research studies on human behavior we concluded
                        that there is a strong need of a system that can optimize the human behavior and its
                        abilities with some effective strategies and also provide the solution for the weak points.
                        Therefore, with the help of artificial intelligence we have created an online human
                        behavior and analytical aptitude test named as AIMTEST. In this test we will be examining
                        the 21st century skills consist of 61 parameters of human behavior by asking the
                        questions relevant with particular behavior the results are then set into the proven
                        psychology formula and the result evaluation is being done.<br><br>
                        Our results will help the teacher or parents to understand the behavior of a child
                        consequently they can assist him to make his future bright with the appropriate steps of
                        improvisation. Our assessment report will also provide the career options based on the
                        child’s abilities. Beyond 500 career options are provided in the various fields of medical,
                        engineering, management, business, designing, applied sciences and many more. With
                        this assessment one can get the knowledge of various career opportunities based on
                        his/her priorities as the AIMTEST will suggest to select the career which is best suitable
                        to, preference, family environment, scope for self-development and abilities and life
                        style.<br><br>
                        For this we have worked on several aspects and it is not possible to discuss all the exact
                        parameters here hence some of them have been discussed to give an understanding
                        about the overall test. We have included the 4C’s of learning to identify the learning skills
                        of a person that can be evaluated with critical thinking, collaboration, communication
                        and creativity.<br><br>
                        By Critical thinking we are determining the analytical thinking that how one evaluates
                        and solves the problem in a rational manner which is determined by the logic section. To
                        understand why and how something happens and could be able to reach at the
                        conclusion based on series of some questions to connect with them logically.<br><br>
                        Collaboration evaluates the ideas, working approach and behavior of a person that how
                        they take decisions and apply them to situations. Due to the human tendency to focus
                        on a limited set of information researches convey the evidence that even successful
                        people fail to notice the absence of critical and readily available information in their
                        environment. Hence evaluation of how the time is managed, how to set realistic and
                        achievable goals, how to resolve the conflicts and strategize for a task all these aspects
                        of life are covered in the Psychology and interest section.
                        Creativity evaluates the designing and imaging skills, how much one can be innovative
                        and creative by adding something to make it more efficient and different from other
                        things.<br><br>
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <div class='img-center mt-5 pt-5'>
                     <img
                        class='signification-img'
                        src='https://res.cloudinary.com/dgimekhep/image/upload/v1666959316/vector_gg4qc4.png'
                        />
                     <div class='heading-pdf'>
                     </div>
                     <br><br>
                     <p class='text-style'>
                        The Communication identifies the purpose medium and context to communicate and
                        understand effectively. Theories focusing on the evolution of laughter or sense of humor
                        point to it as an important adaptation for social communication. How an individual is
                        effective at reading, writing, listening, understanding and using the technologies. The
                        communication purpose can be determined with different learning styles along with
                        reading speed, memory and concentration. However, the memory and concentration are
                        an integral part of the AIMTEST. Most of the evaluation parameters are associated with
                        these fundamental elements.<br><br>
                        The concentration, memory and reading speed are the main focus of the overall test and
                        are associated with several elements of each section. For proving and improving on these
                        three important parameters proven psychology formulas are used which are developed
                        after several years of research and studies of human behavior and their thinking abilities.
                        Hence the idea of AIMTEST is to get the knowledge about an individual’s memory and
                        concentration level and if the outcome is poor then one can improve on it with the help
                        of counseling by our team and once the memory and concentration is improved then
                        definitely student would perform well in the exams and other aspects of life. <br><br>
                        Any assessment tool which intends to highlight the individual’s behavior, personality,
                        traits etc has to be meticulously researched as someone will be taking the
                        knowledgeable decisions on the basis of this documented and accepted theory. Hence it
                        should also be validated and tested for accuracy. AIMTEST is continuously working on
                        the above terms. Therefore we are also following the feedback strategy and a feedback
                        from parents, teachers and students is accepted so that we can integrate valuable
                        suggestions and accuracy in our work with the positive criticism.<br><br>
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>Advantages of AIMTEST</h1>
                  </div>
                  <div class='img-center'>
                    
                     <p class='text-style'>
                        Our society has reshaped itself in so many ways. Face of academics has completely
                        revolutionized with rapid diversification and inclusion of so many fields apart from just
                        science and technology. This has opened the gates of abundant opportunities in various
                        areas for making career. But irony is, still most of the students are unable to decide
                        which course to opt for and blindly they follow the recommendations given by others. It’s
                        not that people around give wrong suggestions but they give their recommendations
                        based on the general judgement criteria that society has always followed for over years
                        now. Parents try hard to put all efforts so that their child could score well and could be
                        considered intelligent. They think their child should score if they spend good time to
                        study. We can see so many examples in our daily lives where people aren’t aware of their
                        potential and settle for less. So, where the problem is? A child doesn’t become creative
                        and successful artist overnight. There are certain qualities or tendencies that children
                        have naturally. But the people around don’t get that or even if they understand, they
                        won’t appreciate it or motivate for the same. As a result, these children end up taking
                        something they were not sure about but got convinced by others suggestion.<br><br>
                        So the problem at root level is the misunderstanding of human nature and psychology. Is
                        there any way or a tool to do so? The answer is ‘yes’. Many tools have been developed
                        over the time to study either psychology or check IQ or guide candidates for career. But
                        AIMTEST talks about all these. Furthermore it is the combination of study potential
                        report, human behaviour assessment report, psychometric test, learning abilities test,
                        multiple intelligence test, thinking potential test, subject evaluation test and career
                        selection test. Many researchers have discussed about the importance of concentration
                        but to the best of our knowledge not much significant work has been done regarding
                        how to find concentration.<br><br>
                        The major breakthrough in this regard is AIMTEST calculates concentration. Yes! Parents
                        would not only know how their child’s concentration is but would also know why it is so
                        and if not good then AIMTEST will give the answer regarding why is it so and how it can
                        be improved. AIMTEST uses research based formula and artificial intelligence to know
                        one’s concentration by making them answer around 25 questions.Concentration plays
                        the most important role behind every study problem faced by students. If concentration
                        is poor, how can one expect a child to learn and understand? How could he store the
                        knowledge if he has weak memory! And if he has problem in any of these, how would he
                        become capable of developing any kind of interest. And if they don’t know what their
                        interests are, how would they decide what career path to opt for .<br><br>
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div class='top-space'>
                  <div class='img-center mt-5'>
                     <p class='text-style'>
                        Through proper analysis of logic, memory, reading skills etc. AIMTEST finds out the
                        concentration. Next very important factor that has not been studied but AIMTEST
                        focuses on is the study potential of a candidate. Suppose there are two students. One
                        study for about 8 hours and another for 4 hours for an exam but both get same marks.
                        According to this scene we can say study potential of second student is better than the
                        first one but can’t identify what and where the problem is with the first student? Where is
                        he lagging behind despite of studying for 8 hours? May be he has a good memory but
                        poor grasping skill or vice versa. AIMTEST will give answer to such problems and suggest
                        the most probable solution. It will find out the root reason for good and bad study
                        potential. Apart from the breakthrough work of calculating concentration and study
                        potential AIMTEST would eventually help a candidate to know his general interests and
                        subject interests.<br><br>
                        How amazing it would be if parents know what are the interests and capabilities of their
                        child and can nurture their talent. This is where AIMTEST comes in. It gives you an
                        opportunity to know your child through a test. The test conducted by AIMTEST covers the
                        question that evaluates the candidate not only on the basis of academics but also
                        psychologically. Through common questions related to the daily activities of children,
                        their mind can be read and interests can be known. What could be better than this! This
                        test is different for different age groups of students.<br><br>
                        On class level this test is available for class 4th to 12th students. After attempting the
                        test, scores can be analysed to grasp the study potential, behaviour and subjects’
                        knowledge of the candidate. It is also a type of psychometric test that would do
                        evaluation on many parameters related to the psychology, human behaviour and
                        interests of the candidate. Once the candidate analyzes their results properly, they may
                        be able to think positively on which career path to choose. This test doesn’t guarantee a
                        final result but it will surely help the students to know themselves and their choices
                        which in turn may lead to a proper selection of career path by them and help to achieve
                        the aim of their life.<br><br>
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>Authenticity of AIMTEST</h1>
                  </div>
                  <br><br>
                  <div class='img-center'>
                     <img
                        class='signification-img'
                        src='https://res.cloudinary.com/dgimekhep/image/upload/v1666962398/02_dasyd2.png'
                        />
                     <br><br>
                     <div class='heading-pdf'>
                     </div>
                     <p class='text-style'>
                        Recently most of the parents are concerned about concentration and memory problem
                        of their child. The mass usage of mobile is increased and hence it affects the study
                        potential of students due to which they are distracting towards their aim. This becomes a
                        matter of pondering for the parents and teachers because this distraction is turning out
                        with drastic changes in the mental and behavior abilities of a child and causing
                        disruptions in their aim.<br><br>
                        Therefore for resolving this issue AIMTEST introduced 61 parameters to evaluate the
                        child’s ability, these parameters involves all the aspects of success. The AIMTEST is a
                        fruitful result of an evidence based research test. It is an online assessment test which is
                        unique and possesses the idea of intelligence, behavioral and analytical skills to help in
                        shaping the aim of student to achieve the goals. The AIMTEST at its earlier stage
                        conducted on hundred students and researched the results and concluded the
                        discussions with the parents through assessment reports. It was a tremendous response
                        we received from parents, doctors, Psychologists, students, teachers and principals of
                        various schools. Since last year, on the basis of those results the AIMTEST team is
                        working for enhancement of assessment along with guidance of psychologist and
                        doctors and come up with the involvement of artificial intelligence. The AIMTEST had
                        been developing after several years of research on various psychological aspects and
                        cognitive behavior of subjects along with neuroscience studies. The team is continuously
                        making the efforts to obtain the results with an effective approach. Through all this
                        concept and techniques we endeavor to provide optimum assessment report.<br><br>
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>What is CRMGS ?</h1>
                  </div>
                  <div class='img-center'>
                     <img
                        class='signification-img'
                        src='https://res.cloudinary.com/dgimekhep/image/upload/v1666962797/123_y1ufqg.png'
                        />
                     <div class='heading-pdf'>
                     </div>
                     <p class='text-style'>
                        After researching we came to know that this study is the combination of concentration,
                        reading speed, memory, grasping skills, study potential.<br>
                        AIMTEST will emerge as a game changer for the learners. For the AIMTEST parents,
                        teachers, students, researchers, doctors and psychologists are involved for the
                        identification of the various abilities with a positive ripple effect together with long term
                        relationship through counseling sessions.. We all are aware about what these
                        parameters are but the only way we have been analyzing them is in terms of good or
                        bad, high or low, strong or weak etc. We are able to know whether concentration power
                        of a child is strong or weak, but how strong or weak no one is able to measure it till date.
                        For the detailed understanding about what study is, one needs to know some specific
                        basic parameters too like - <br>
                        <span class='bold-style'> Study = Language Skills + Reading Skills + Memory + Concentration + Grasping
                        Power + Study Time + Interest</span>
                        We believe that nobody has ever thought about measuring concentration, reading,
                        memory speed, grasping skills and study potential of an individual or learner. So Before
                        the AIMTEST, have you ever tried to know about your concentration level? Do you ever
                        ask to someone that how much reading speed you have? How much memory power you
                        bear? How much do you able to grasp the knowledge? Do you know about the actual
                        study potential of yourself? The answer will be a big NO, because no one has provided
                        yet such a tool to measure the abilities and intelligence aspects of an individual with
                        proven studies and formulas. We all have created the perceptions about the abilities of a
                        learner without understanding the real reason behind it and this lead to various failures
                        in the life. For this we need to observe the both sides of a coin before giving any
                        judgment about one’s ability.
                        Therefore, first time we have introduced the CRMGS test. CRMGS stands for
                        concentration, reading speed, memory, grasping skills and study potential. These are the
                        five main focal points of AIMTEST and play a vital role for learners.<br>
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div class='top-space'>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>CONCENTRATION</h1>
                  </div>
                  <div class='img-center'>
                     <p class='text-style'>
                        Everyone has different concentration levels some people have a brilliant concentration
                        but some people struggle to focus on things or to pay attention. Concentration is a factor
                        which is directly associated with our connections with people. Poor concentration levels
                        can also affect establishing the relationships in the area of work. Rather it has the power
                        to influence the outlook and values of people with leisure activities. It also affects the
                        nature of work, working environment, responsibility levels and decision making skills a
                        person might reach. All these are the indication that show how massive is the impact of
                        concentration could be.<br><br>
                        In other words concentration can be defined as the mental efforts one directs towards
                        working or learning at a moment. Since we worked on research reviews and found the
                        conclusion that there is no proven formula exists for determining the concentration of
                        the human brain. Therefore we worked for several years and developed a formula for
                        concentration which will definitely predict a guaranteed concentration level of a human
                        on the basis of this test. We have also worked on getting the accuracy and for validation
                        of our results through which we can prove it. This may be the next big trend in academia,
                        researchers and learners or enthusiasts to evaluate and enhance the concentration level
                        of the human brain.<br><br>
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br><br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>READING SPEED</h1>
                  </div>
                  <div class='img-center'>
                     <p class='text-style'>
                        Reading is the process of recognizing and absorbing phrases or sentences on a page
                        whereas reading speed refers to rapid recognition and absorption of all at once, rather
                        than identifying individual words. A normal rate for learning is 100-200 wpm (words per
                        minute), and for comprehension it is 200-400 wpm. Speed reading is normally done at a
                        rate of around 400-700 wpm. Therefore, the reading speed is identified on the basis of
                        reading a passage given in the Aim test and if the reading speed is equal or below the
                        rate of learning then it can be improved with the help of tips in the counseling sessions.<br><br>
                        <span class='bold-style'> Why reading speed is one of the focuses of AIMTEST?</span><br><br>
                        The most important reason is when the reading speed of a person is identified than it
                        can be improved. Once the speed reading is achieved it benefits with various abilities of
                        effective communication. It helps an individual to read a lot more than one would be
                        able to read normally. It enables social engagement as speed reading allows more
                        reading than average reader and an individual then keeps updated on the views and
                        news and conversations.<br><br>
                        A person with good reading speed involves scanning, reading; comprehending and a
                        good concentration level because concentration is the key to speed reading. It involves
                        sustained concentration as one is doing multiple tasks like reading, understanding,
                        looking; getting ideas from the text therefore the individual with good reading speed is
                        able to grasp concepts and conversations. This empowers you in your life and career. It
                        improves the memory as well as instills confidence and adds to your knowledge. In short,
                        it helps you in all phases of your life.<br><br>
                     </p>
                     <br><br>
                     <img
                        class='reading-img'
                        src='https://res.cloudinary.com/dgimekhep/image/upload/v1665386646/Untitled-1_f5vguc.png'
                        />
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br><br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>MEMORY</h1>
                  </div>
                  <div class='img-center'>
                     <p class='text-style'>
                        Human memory has the capability to preserve and recover information. Memory is type
                        of storage and process which is used to obtain, maintain and storing of information. The
                        memory works in three processes encoding, storage, and retrieval. Each person varies
                        with its memory power including sensory, short-term, working and long-term. Sensory
                        memory is a very concise recall of a sensory incident including some seen or hearing.
                        Some compare sensory memory to a quick snapshot of what you just experienced that
                        quickly disappears. Short-term memory is that brief period of time where you can recall
                        information you were just exposed to. Short-term often encompasses anywhere from 30
                        seconds to a few days, depending on who is using the term. Working memory can be
                        defined as the ability of our brains to keep a limited amount of information available
                        long enough to use it. Long-term memory covers the memories assorted from a few days
                        to decades. For a brief time before the ink dries, it’s possible to smudge what’s written.
                        But after the memory is consolidated, it changes very little. Sure, information may fade
                        over the years like an old letter, but under ordinary circumstances the content of the
                        memory stays the same, no matter how many times it’s taken out and read.<br><br>
                        Since the memory is also an important measure of the AIMTEST. The estimation of one’s
                        memory and improvisation in order for successful learning to take place, this information
                        has to move from the sensory or the short-term memory to the long-term memory.
                        AIMTEST assists you for making it through.<br><br>
                     </p>
                     <br><br>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br><br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>GRASPING SKILLS</h1>
                  </div>
                  <div class='img-center'>
                     <p class='text-style'>
                        Grasping power is the capability to comprehend the things which we listen or watch and
                        preserve it in the mind. Many people have a tendency to grasp the subject or any type of
                        knowledge with lots of efforts whereas some people are too moderate or very swift and
                        bright at the grasping skills. Grasping power or skills proceed from one’s focus and the
                        level of concentration, since the AIMTEST has focused on all the relative aspects of
                        memory and concentration which can affect other parameters to measure the
                        capabilities. <br><br>
                        The AIMTEST offers to know the grasping skill as it is associated with several parameters
                        and most prominently with memory and concentration. The higher concentration level
                        accumulates a high grasping power although various aspects like learning style, thinking
                        style, management and self motivation are some of the skills that are directly associated
                        with the grasping skills. <br><br>
                        Also for improving the grasping skills it is essential to keep the memory functioning like
                        always strive to learn new things, involve in activities to maintain the operational actions
                        of brain. Hence for calculating the grasping power all these characteristic of a person are
                        studied and observed for concluding about the results. Hence for making an individual
                        efficient in terms of learning abilities or behavioral abilities it is necessary to enhance
                        their grasping skills.<br><br>
                     </p>
                     <br><br>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br><br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>STUDY POTENTIAL</h1>
                  </div>
                  <div class='img-center'>
                     <p class='text-style'>
                        The study potential in AIMTEST defines the capacity of an individual to develop
                        themselves during practicing, studying and trainings or learning. Higher study potential
                        values result in reaching their abilities for growth and development in terms of various
                        aptitudes and skills. This parameter is dependent on three components memory,
                        concentration, and study time. The capacity may vary with individuals having different
                        skills. Therefore it is one of the important parameters of AIMTEST and plays an
                        imperative role with memory and concentration. An individual having good memory and
                        concentration may obviously seizes the good score of study potential whereas the weak
                        memory and concentration level will also affect the study potential of an individual.<br><br>
                        It has been observed that some people have long sitting study time but they are unable
                        to achieve their goals and lagging behind the success. This evidence points towards a gap
                        between the activities and involvement with their abilities to perform a task whether it is
                        a simple reading, writing work or a problem solving work. Here we are evaluating the
                        degree to which a student can realize their caliber and potential that will reflect in the
                        further involvement of their skills. Thus AIMTEST enables them to know their strengths
                        and develop their intuitive skills to grasp the learning. Hence special attention is given to
                        a comparative analysis of evaluations regarding their study potential and is improved by
                        the indicators for the next attempts of AIMTEST.<br><br>
                     </p>
                     <br><br>
                     <img
                        class='signification-img'
                        src='https://res.cloudinary.com/dgimekhep/image/upload/v1665209992/2206_w039_n003_266b_p1_266_gdz5w5.jpg'
                        />
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br><br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>EVALUATION PARAMETER</h1>
                  </div>
                  <div class='img-center'>
                     <p class='text-style'>In this world everyone has a distinctive ability at certain field. We cannot articulate poor to anyone because they
                        may have exceptional quality in particular field but in the evaluation of student by AIMTEST depends on
                        answering of questions. If anyone does not take test seriously and leave the question without reading or
                        answering the questions, in that case software asses the candidate performance as a poor vice a versa if
                        candidate take the test seriously in that case the accuracy of result is more than 90%. So, opt for the right path
                        which imparts you a significant platform to flourish your abilities
                     </p>
                     <br><br>
                     <div class='table-width'>
                        <table class='pdf-table'>
                           <tr class='table-data'>
                              <th>PERCENTAGE</th>
                              <th>GRADE</th>
                           </tr>
                           <tr class='table-data'>
                              <td>80% TO 100%</td>
                              <td>EXCELLENT</td>
                           </tr>
                           <tr class='table-data'>
                              <td>60% TO 80%</td>
                              <td>VERY GOOD</td>
                           </tr>
                           <tr class='table-data'>
                              <td>80% TO 60%</td>
                              <td>GOOD</td>
                           </tr>
                           <tr class='table-data'>
                              <td>10% TO 40%</td>
                              <td>FAIR</td>
                           </tr>
                           <tr class='table-data'>
                              <td>0% TO 10%</td>
                              <td>POOR</td>
                           </tr>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div class='top-space'>
                <br><br>
                  <div class='img-center mt-5'>
                     <p class='text-style'>
                        The SWOT (strengths, weaknesses, opportunities, and threats) analysis is a schema
                        which is generally employed in industries for the evaluation of organizations potential. In
                        the AIMTEST same criteria is used to evaluate student’s competitive position and to
                        develop strategic planning for their growth and development. SWOT analysis assesses
                        internal and external aspects, as well as the current and future potential of student’s. It
                        endows with the fresh perspectives, and new ideas for the strategic planning for further
                        growth and development of the student.<br><br>
                        SWOT Analysis is one of the best tool to assess an individual’s quality which helps him to
                        decide aim.The Aim Test helps to know the Strength, Weakness Opportunity, and Threats
                        of a person. This is the tool that can assess both internal and external quality of a person
                        by knowing the strength one can build the confidence and can use this as weapon to win
                        his battle field of life.<br><br>
                        Every human being has weakness without knowing the weakness no one can achieve the
                        success once we come to know our weakness then only we can get the success
                        .Opportunity is the external factor for an individual’s life .Aim test assist to know the
                        opportunity in different areas of life.<br><br>
                        Threats are challenges which a person has to face at every aspect of life. Everyone
                        should know the challenges which he has to face in the life after knowing it individual
                        can get touch the zenith point of success.<br><br>
                     </p>
                     <br><br>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='dynamic0'></div>
<div class='dynamicparent0'></div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br><br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>  MULTIPLE INTELLIGENCE</h1>
                  </div>
                  <div class='img-center'>
                     <p class='text-style'>
                        Multiple intelligences describe the different ways students can learn and gain
                        information. The intelligences can be variety of music, pictures, numbers, social
                        interactions, physical movement, harmony with nature etc. Several theories and
                        researches have been devised for multiple intelligence of human but there is always a
                        debate for the concept of intelligence. Numerous definitions are available however no
                        evidence of accurate intelligence is produced. Researchers suggested that intelligence is
                        a single general entity whereas others concluded that intelligence encompasses a range
                        of aptitudes, skills and talents. Therefore AIMTEST works on several parameters that
                        facilitate the clear understanding of an individual multiple intelligences.  <br>
                        By the recognition of the multiple intelligences one can also look at their lives and find
                        investigative potentials to search on what they left behind earlier and grab to develop
                        opportunity through courses, hobbies, or other programs. The AIMTEST also works on
                        the same principle and introduced various intelligences to obtain the optimum results.
                        Some of them are-  <br>
                        <span class='iq-center'>  <span>Intelligence Quotient (IQ)</span></span>
                        An IQ test is an evaluation that measures a variety of cognitive capability intelligence
                        quotient the level of logic that is used by a person to make the decisions. In short ,IQ is
                        the ability to resolve the problem in limited time.  <br>
                        <span class='iq-center'>  <span>Emotional Quotient (EQ)</span></span>   
                        Emotional Quotient is the score level of a person’s emotional intelligence. Emotional
                        intelligence is the capability to manage emotions positively in order to manage stress
                        and overcome the challenges and achieves personal and professional Aim.  <br>
                        <span class='iq-center'>  <span>Adverse Quotient (AQ)</span></span> 
                        The adverse quotient is the score level of a person’s capability to confront the challenges,
                        adversities, difficulties and the capability to overcome challenges by taking the right
                        decisions. This type of intelligence is inevitable to manage thoughts over actions with the
                        aim of adaptive to change the environments around us.  <br>
                        <span class='iq-center'>  <span>Creative Quotient (CQ)</span></span>   
                        The creative quotient is the score of a person’s ability to think differently. Creativity is the
                        capacity of any individual to think of innovation to a certain problem different from
                        clichéd solutions. Creativity means to ponder a single task with different solution.<br><br>
                     </p>
                     <br><br>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>LEARNING STYLE</h1>
                  </div>
                  <div class='img-center'>
                     <p class='text-style'>
                        Every person has their way or preferred way of learning but they are not aware about it.
                        So AIMTEST assists to find out the right learning style of an individual. The different
                        learning abilities only show the comfort zone of learners. Identify these unique skills and
                        preferred them to perform the task can lead to better outcomes.
                        Learning style is a factor of cognitive skills, emotions and environmental factors. For this
                        reason, learning ability is categorized into some styles and present as different options
                        that learners can choose what works best for them.<br>
                        <span class='bold-style'>  What is the purpose of identifying the learning styles?</span>
                        The idea of individualized learning has greatly influenced the education system. To
                        identify the personal preferences of learners that how they prefer to receive information,
                        this can be more appropriate for educators to impart their knowledge to learners.
                        Understanding the learning styles can help to understand student for fast learning and
                        grasping the knowledge and enhance their skills according to their comfort way.<br>
                        <span class='bold-style'>  How AIMTEST is going to identify the learning styles?</span>
                        Getting knowledge of student’s learning styles is important for both learners and
                        educators. If the learner is aware of his/her learning style then he/she can learn more
                        effectively and with less frustration.<br>
                        Following are the 4 main learning styles that enhance the ability to learn in the preferred
                        way of the students:<br>
                     </p>
                     <br><br>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br><br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'></h1>
                  </div>
                  <div class='img-center'>
                     <p class='text-style'>
                        <span class='iq-center'>  <span>  AUDITORY LEARNERS STYLE</span></span>
                        - Auditory learners prefer to learn by listening, speaking, discussing. They feel difficulty
                        with theoretical written or drawn instructions. The auditory learner understands better if
                        explained out loud. They keep the things remember by doing speaking with self.
                        <span class='iq-center'>  <span> VISUAL LEARNING STYLE</span></span>
                        - Visual learning is also known as “spatial learning”. Visual learners learn by video, chart,
                        diagram, map, animation and infographic. A visual learner can effectively interpret the
                        information if it is seen by them. They possess a photographic kind of memory they store
                        and retrieve the information as a snapshot of memories.
                        <span class='iq-center'>  <span> READ & WRITE LEARNING STYLE</span></span>
                        Page: 26 of 58
                        - Reading and writing learners like to read and take notes. This type of learner usuallyREAD & WRITE LEARNING STYLE
                        - Reading and writing learners like to read and take notes. This type of learner usually
                        learns by reading and writing. They absorb and preserve the information by reading and
                        <span class='iq-center'>  <span>  KINESTHETIC
                        LEARNING
                        STYLE</span></span>
                        writing the texts. The read
                        write learners are
                        good at reading
                        and have better grammar.
                        - Kinesthetic learner learns the thing by doing the activity. They require an involvement
                        and use manipulative strategies to learn. They prefer direct demonstration or practical
                        learning. They grasp the thing better by hands on learning.<br><br>
                     </p>
                     <br><br>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br><br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>THINKING STYLE</h1>
                  </div>
                  <div class='img-center'>
                     <p class='text-style'>
                        Thinking styles represent the thinking abilities and observe the applications of
                        intellectual abilities and knowledge to solve a problem. It may possible that two or more
                        people have the same intelligence level but may vary on decision and application of
                        completing a task with their abilities. Some research concluded that some of the thinking
                        styles promote creativity whereas others diminish it. AIMTEST using the skills to identify
                        the thinking style that helps us understand the subject how they look around the world
                        whether think critically, solve problems, make logical choices, develop their own values
                        and beliefs or not. This will enable us to incorporate the exact attention to detail to
                        enhance the necessary actions for completing a task. Some of the thinking styles are
                        discussed below.<br><br>
                        <span class='iq-center'>  <span>    Cognitive Thinker</span></span>
                        A Cognitive thinker sees the world in a different manner they apply their cognition in
                        every phase of life they are more calculative than others they analyze the situation and
                        take rational decisions. A cognitive thinker possesses higher level brain functions. These
                        types of thinkers are proficient in language, planning and perceptions.<br>
                        <span class='iq-center'>  <span>   Emotional Thinker</span></span>
                        Emotions are as important as intelligence and require a balance for a successful life. This
                        sort of thinker always contemplates emotionally and makes a verdict on the basis of
                        emotions. They took the decisions based on their feeling and feel nervous while making
                        a change in their lives. These people are more impulsive than others.<br> 
                        <span class='iq-center'>  <span>   Negative Thinker</span></span>
                        This kind of thinker when perceive anything or stuff, they think worsens about it. They
                        always find the negative points about self, others and their nearby surrounding. They
                        always tend to see the mistakes due to their negative thinking. A person may become a
                        negative thinker due to the various distortions in life.<br><br>
                        <span class='iq-center'>  <span> Positive Thinker</span></span> 
                        A Positive thinker always thinks positively and has an optimistic behavior towards every
                        aspect of life. They tend to identify both aspects the dark and the bright but they always
                        focus on the things that will result or promote them in a positive way. They accept the
                        challenges of life optimistically.
                     </p>
                     <br><br>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br><br>
                  <div class='img-center'>
                     <p class='text-style'>
                        <br>
                        <span class='iq-center'>  <span> Scientific thinker</span></span> 
                        Usually, this sort of thinker observes the thing or any issue on the basis of past
                        experiment, facts and scientific inspection. They are clearer about the purposes and
                        issues. They endeavor relevance and accuracy for anything.<br><br>
                        <span class='iq-center'>  <span> Business approach thinker</span></span> 
                        This kind of thinker always has business approaches he/she only thinks about profit and
                        loss in the life. They always possess a strategy to deal with in any situation. They keep
                        upgrade by competitive approaches for the business, politics and everyday life.
                     </p>
                     <br><br>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br><br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>PERSONALITY TYPE</h1>
                  </div>
                  <div class='img-center'>
                     <p class='text-style'>
                        <span class='iq-center'>  <span>  Logical Personality</span></span>  
                        Those person who thinks logically and factually they are a left - brain dominated person.
                        They may have an approach like researcher they speak less their concentration is good,
                        they prefer shortcut or try to finish task in short time, their analytical skills are
                        tremendous<br><br>
                        <span class='iq-center'>  <span>Creative Personality</span></span> 
                        A person who has innovative thinking style, whose imagination power is really good is a
                        Page: 30 of 58A person who has innovative thinking style, whose imagination power is really good is a
                        right brain dominated person, who has good creativity, his management is really good he.
                     </p>
                     <br><br>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>Importance of Career Options</h1>
                     <p class='bold-style'>"How to use AIMTEST for proper career guidance?”</p>
                  </div>
                  <div class='img-center'>
                     <p class='text-style'>
                        A good career is one of the most essential needs in life. Career of our choice and interest
                        not only enables us to make money and secure our future but it also becomes a source
                        of immense happiness and satisfaction for us. This is the reason, selection of the right
                        career is imperative.
                        The rapid diversification and expansion of our education system has led to creation of
                        new work opportunities. Today there are numerous fields with abundant career options.
                        As a result, choosing right career path has become complex and confusing. <br> 
                        Even after passing high school, most of the students can’t decide in which field they want
                        to make their career. The hardest and most challenging task for them is to choose a
                        career according to their skills, interests, priorities and capabilities. They can’t figure out
                        what makes them happy and satisfied. And so they end up choosing from whatever
                        suggestions they get from people without knowing what would make them happy and
                        satisfied.
                      
                        A right career can make any individual more confident, informed and dedicated. The
                        importance of a career in life is immense. So, it must be chosen cautiously. Before
                        finalizing any career option ask yourself whether or not it will help you to reach the
                        destination, you have set for yourself. Picking up the right career is immensely important
                        for leading a peaceful and happy life. AIMTEST will help you to choose correct career
                        option and reach the zenith of success. But how? You can avail the maximum benefit
                        through AIMTEST by following below mentioned procedure –<br>  
                        1.Result would give your scores analyzing which candidate can evaluate themselves on
                        various parameters (around 61) like concentration power, memory, study potential,
                        reading writing skills, audio-visual abilities, creativity, cognitive thinking, subject interest,
                        grasping skills, learning and thinking skills etc. <br>  
                        2.Once you analyze the results you’ll not only know what is your level in the above
                        mentioned parameters but also what are the reasons for good and bad scores. These
                        parameters include general interest and subject interest too. Therefore, through the
                        overall result you would be at ease to choose a subject of your interest. For example, if
                        your management and business related parameters have more score, you can opt for
                        the field related to the same. <br> 
                        3.Once you get an idea about which subjects to opt for, through AIMTEST, you can think
                        about whether it’s right or wrong based on your past experiences, achievements, awards
                        or your performance in those subjects. <br> 
                        4.After get satisfied with your result regarding choice of subjects, you can take
                        suggestions from the subject experts regarding the career prospects in the same and
                        finalize according to your convenience
                     </p>
                     
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br><br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>PSYCHOLOGY TOWARDS CAREER</h1>
                  </div>
                  <div class='img-center'>
                     <br><br>
                     <div class='table-width'>
                        <table class='pdf-table'>
                           <tr class='table-data'>
                              <th>CAREER FIELD</th>
                              <th>RATING</th>
                              <th>PROFESSION</th>
                           </tr>
                           <tr class='table-data'>
                              <td>BUSINESS
                                 ENTREPRENEUR :
                              </td>
                              <td>***</td>
                              <td>BUSINESS SET UP,SHOP,SHOWROOM,START UP, E‐COMMERCE PORTAL</td>
                           </tr>
                           <tr class='table-data'>
                              <td>DESIGNING:
                              </td>
                              <td>***</td>
                              <td>GRAPHIC DESIGNER CIVIL ,ENGINEER ANIMATION MOVIE MAKER ,INTERIOR
                                 DESIGNER, FASHION DESIGNER ARCHITECT PROPERTY PLANNER WEDDING PLANNER
                                 ,EVENT MANAGER
                              </td>
                           </tr>
                           <tr class='table-data'>
                              <td>ENGINEERING :
                              </td>
                              <td>***</td>
                              <td>ARTIFICIAL INTELLIGENCE ENGINEER AUTOMOBILE ENGINEER ,CHEMICAL ENGINEER,
                                 ELECTRICAL ENGINEER ELECTRONICS ENGINEER MECHANICAL ENGINEER ,SOFT WARE
                                 ENGINEER.
                              </td>
                           </tr>
                           <tr class='table-data'>
                              <td>PHYSICS :
                              </td>
                              <td>***</td>
                              <td>PHYSICS TEACHER CHEMISTRY TEACHER SCIENTIST, RESEARCHER PHYSICIST
                                 CHEMIST.
                              </td>
                           </tr>
                           <tr class='table-data'>
                              <td>CHEMISTRY : :
                              </td>
                              <td>***</td>
                              <td>PHYSICS TEACHER CHEMISTRY TEACHER SCIENTIST, RESEARCHER PHYSICIST
                                 CHEMIST.
                              </td>
                           </tr>
                           <tr class='table-data'>
                              <td>BANKING AND
                                 FINANCE :
                              </td>
                              <td>***</td>
                              <td>SHARE MARKET ,ANALYSTS,CHARTERED ACCOUNTANT, COMPANY SECRETARY ,
                                 FINANCE OFFICER, CONSULTANT INSURANCE / BUSINESS ANALYST ,INVESTMENT
                                 BANKER.
                              </td>
                           </tr>
                           <tr class='table-data'>
                              <td>MANAGEMENT :
                              </td>
                              <td>***</td>
                              <td>BUSINESS MANAGER,SOCIAL MEDIA MARKTING MANAGER,MARKETING MANAGER
                                 HR MANAGER PRODUCTION MANAGER ,SALES MANAGER.
                              </td>
                           </tr>
                           <tr class='table-data'>
                              <td>Education :
                              </td>
                              <td>***</td>
                              <td>TEACHER, PROFESSOR, CAREER COUNSELPRE, SCHOOL OWNER, PRINCIPAL,
                                 ACADEMIC CONSULTANT.
                              </td>
                           </tr>
                           <tr class='table-data'>
                              <td>POLITICAL AND
                                 PUBLIC AFFAIRS  :
                              </td>
                              <td>***</td>
                              <td>POLITICIAN .LAWYER .JUDGE ,PUBLIC RELATIONSHIP OFFICER ,IAS/IPS OFFICER
                                 TEACHER.
                              </td>
                           </tr>
                           <tr class='table-data'>
                              <td>TEACHER
                                 MASS & MEDIA
                                 COMMUNICATION  :
                              </td>
                              <td>***</td>
                              <td>REPORTER, ANCHOR/RADIO JOCKEY ENGSPEAKING COURSE POET WRITER.</td>
                           </tr>
                           <tr class='table-data'>
                              <td>Medical  :
                              </td>
                              <td>***</td>
                              <td>DOCTOR, PHARMACIST NUTRITIONIST DR OFFICER, HOMEOPATHY DOCTOR, MEDIC
                                 EDITOR SURGEON.
                              </td>
                           </tr>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br><br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'> HUMANITY </h1>
                  </div>
                  <div class='img-center'>
                     <br><br>
                     <div class='table-width'>
                        <table class='pdf-table'>
                           <tr class='table-data'>
                              <th>CAREER FIELD</th>
                              <th>RATING</th>
                              <th>PROFESSION</th>
                           </tr>
                           <tr class='table-data'>
                              <td>
                              </td>
                              <td>***</td>
                              <td>ACTOR, MUSICAL THEATER PERFORMER, DRAMA‐ THERAPIST, THEATER DIRECTOR, SCREENWRITER, ARTS
                                 ADMINISTRATOR, THEATER STAGE MANAGER
                              </td>
                           </tr>
                           <tr class='table-data'>
                              <td>SPORTS:
                              </td>
                              <td>***</td>
                              <td>SPORTSPERSON, UMPIRE/REFEREE/INSTRUCTOR, COACH, ATHLETIC TRAINER, SPORTS COMMENTATOR,
                                 SPORTS BUSINESS MANAGER.
                              </td>
                           </tr>
                           <tr class='table-data'>
                              <td>MUSIC &
                                 DANCE  :
                              </td>
                              <td>***</td>
                              <td>CHOREOGRAPHER, DANCE TEACHER, ARTS ADMINISTRATION, MARKETING FOR DANCERS, DANCE
                                 PHOTOGRAPHER OR VIDEOGRAPHER ETC.
                              </td>
                           </tr>
                           <tr class='table-data'>
                              <td>ART & CRAFT OR
                                 DESIGNING  :
                              </td>
                              <td>***</td>
                              <td>INTERIOR DESIGNER, ART DIRECTOR, FASHION DESIGNER, USER EXPERIENCE ﴾UX﴿ DESIGNER, INDUSTRIAL
                                 DESIGNER, GRAPHIC DESIGNER, MULTIMEDIA ARTIST ETC.
                              </td>
                           </tr>
                           <tr class='table-data'>
                              <td>ENTERTAINMENT & RECREATION :
                              </td>
                              <td>***</td>
                              <td>ACTIVITY SPECIALISTS, RECREATION LEADERS, CAMP COUNSELORS, TRAINERS, RECREATION TECHNICIAN.
                              </td>
                           </tr>
                           <tr class='table-data'>
                              <td>BANKING AND
                                 GUIDANCE :
                              </td>
                              <td>***</td>
                              <td>RESEARCHER, SCIENTIST, TEACHER, MANAGER – EDUCATION AND SKILL TRAINING, MANAGER OF
                                 INTERNATIONAL STUDENT PROGRAMMES, FOREIGN LANGUAGE TEACHER, ANALYST ﴾HIGHER EDUCATION
                                 ANALYST﴿, PRODUCT MANAGER FOR DIGITAL EDUCATION SOLUTIONS ETC.
                              </td>
                           </tr>
                        </table>
                        <br><br>
                        <p class='bold-style'>"Acting/Drama, Sports , Education, Music & Dance, Art and craft/
                           Designing, Entertainment & Recreation”
                        </p>
                        <p class='text-style'>
                           <span class='iq-center'>  <span>   Music and Dance</span></span>  
                           Music and dance are used to be the hobbies of people at a point of
                           time. There are numerous promising opportunities available for those passionate about
                           dancing and music and can explore incredible careers. There are reality shows to get the
                           talented people in music and dance and their passion can be recognized. With the
                           growing demand of all-rounder, the world recognizes highly valued performers who are
                           skilful in singing, playing instruments, compose music and dancing. Some of the
                           specialized courses that will fit your interest and help you build a rewarding career in
                           Dancing is to become a choreographer, Dance Teacher, Work in Arts Administration,
                           Marketing for Dancers, Dance Photographer or Videographer etc.<br><br>
                           <span class='iq-center'>  <span>  Sports</span></span>  
                           If you choose sports as a career, it also gives lots of fame and money. You can
                           make a career in any sports field depending on what sports you take up as your
                           expertise. There is a lot of scope at national and international level.Various sports fields
                           are Cricket, Badminton, Volleyball, Football, Basketball, Boxing, Gymnastics, Hockey,
                           Table Tennis, Wrestling, Cycling, etc.
                           <br><br>
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <div class='img-center'>
                  <br><br> <br><br>
                     <div class='top-space'>
                       
                        <p class='text-style'>
                           <span class='iq-center'>  <span>     Art and craft/ Designing </span></span>  
                           The scope in fine arts is quite good, you can earn respect &
                           money both under this professional career. You can display your work in museums,
                           private galleries or have private collections and get rewarded for your work. The objects
                           made by you will sell in studios, auctions, stores or at arts and crafts shows. Some of the
                           job opportunities are- Interior Designer, Art Director, Fashion Designer, User Experience
                           (UX) Designer, Industrial Designer, Graphic Designer, Multimedia Artist etc.<br><br>
                           <span class='iq-center'>  <span>     Education </span></span>  
                           The Work Education is viewed as purposive and meaningful manual work,
                           organized as integral part of the learning process and resulting into goods or services
                           useful to the community, besides the pleasure of self fulfillment. Several job
                           opportunities are available as Researcher, Scientist, Teacher, Education/ Academic
                           researcher, Manager, Manager – Education and Skill Training, Manager of International
                           Student Programmes, Foreign Language Teacher, Analyst (Higher Education Analyst),
                           Product Manager for Digital Education Solutions etc.<br><br>
                           <span class='iq-center'>  <span>   Entertainment & Recreation </span></span>  
                           Recreation workers design and lead activities to help
                           people stay active, improve fitness, and have fun. Recreation workers are employed in a
                           variety of settings, including recreation centers, parks, summer camps, and nursing and
                           residential care facilities. Education and training requirements for recreation workers
                           vary with the type of job, but workers typically need at least a high school diploma or the
                           equivalent and a few weeks of on-the-job training. Activity specialists, Recreation leaders,
                           Camp counselors,trainers, Recreation Technician etc.<br><br>
                           <span class='iq-center'>  <span>  Acting /Drama</span></span>  
                           Combining Art and Drama, Acting is a very competitive profession. To
                           start a career in the field, Actors need to build up a showreel of experience which is
                           followed by getting a break in the industry. Actor,Musical theater performer,drama-
                           therapist,theater director,Screenwriter, Arts administrator, theater stage manager etc
                           <br><br>
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br><br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>  Various fields of career </h1>
                  </div>
                  <div class='img-center'>
                     <br><br>
                     <div>
                        <p class='text-style'>
                           Engineering – The application of knowledge of science and maths to solve any problem
                           practically is called Engineering. Engineers are modern builders, machine makers,
                           innovators and facilitators who figure are specialized in designing our day to day utility
                           devices. As knowledge of science and maths covers a vast area, types of Engineering are
                           also abundant.
                        </p>
                        <div class='sign-heading'>
                           <h1 class='top-heading'> ENGINEERING </h1>
                        </div>
                        <div class='table-flex'>
                           <div class='table-engineering'>
                           <table class='pdf-table'>
                           <tr className='table-data'>
                           <td class='space-number'> 1.
                           </td>
                           <td>Acoustical engineering</td>
                        </tr>
                        <tr className='table-data'>
                           <td>2.
                           </td>
                           <td>Aerospace engineering</td>
                        </tr>
                        <tr className='table-data'>
                           <td>3.
                           </td>
                           <td> Agricultural engineering</td>
                        </tr>
                        <tr className='table-data'>
                           <td>4.
                           </td>
                           <td> Aquatic and environmental engineering </td>
                        </tr>
                        <tr className='table-data'>
                           <td>5.
                           </td>
                           <td>Architectural engineering and Architecture</td>
                        </tr>
                        <tr className='table-data'>
                           <td>6.
                           </td>
                           <td>Automotive systems engineering ﴾or Automotive
                           engineering﴿
                           </td>
                        </tr>
                        <tr className='table-data'>
                           <td>7.
                           </td>
                           <td> Biological engineering                   
                           </td>
                        </tr>
                       
                        <tr className='table-data'>
                           <td>8.
                           </td>
                           <td>Biomaterial’s engineering
                           </td>
                        </tr>
                        <tr className='table-data'>
                           <td>9.
                           </td>
                           <td>Biomedical engineering
                           </td>
                        </tr>
                        <tr className='table-data'>
                           <td>10.
                           </td>
                           <td>Bioresource engineering
                           </td>
                        </tr>
                        <tr className='table-data'>
                           <td>11.
                           </td>
                           <td>Building services engineering
                           </td>
                        </tr>
                        <tr className='table-data'>
                           <td>12.
                           </td>
                           <td> Ceramic engineering
                           </td>
                        </tr>
                      
                        <tr className='table-data'>
                           <td>13.</td>
                           <td>Chemical engineering
                           </td>
                        </tr>
                        <tr className='table-data'>
                           <td>14.
                           </td>
                           <td>Civil engineering</td>
                        </tr>
                        <tr className='table-data'>
                           <td>15.
                           </td>
                           <td>Coastal engineering</td>
                        </tr>
                        <tr className='table-data'>
                           <td>16.
                           </td>
                           <td> Combat engineering: the use of engineering skills for
                           military purposes
                           </td>
                        </tr>
                        <tr className='table-data'>
                        <td>17.
                        </td>
                        <td>Commercial engineering</td>
                     </tr>
                           <tr class='table-data'>
                              <td>18.
                              </td>
                              <td>Communication engineering Communication</td>
                           </tr>
                           
                           </table>
                           </div>
                           <div class='table-engineering'>
                           <table class='pdf-table'>
                           <tr class='table-data'>
                              <td class='space-number'>19.
                              </td>
                              <td>Computer engineering                   
                              </td>
                           </tr>
                             <tr class='table-data'>
                                <td>20.
                                </td>
                                <td>Conservation engineering Conservation
                                </td>
                             </tr>
                             <tr class='table-data'>
                                <td>21.
                                </td>
                                <td>Conversion engineering Conversion
                                </td>
                             </tr>
                             <tr class='table-data'>
                                <td>22.
                                </td>
                                <td>Construction engineering Construction</td>
                             </tr>
                             <tr class='table-data'>
                                <td>23.
                                </td>
                                <td>Control systems engineering ﴾or Control engineering﴿                     
                                </td>
                             </tr>
                             <tr class='table-data'>
                                <td>24.
                                </td>
                                <td>Demolition engineering Demolition
                                </td>
                             </tr>
                             <tr class='table-data'>
                                <td>25.
                                </td>
                                <td>Electrical engineering
                                </td>
                             </tr>
                             <tr class='table-data'>
                                <td>26.
                                </td>
                                <td>Electromechanical engineering</td>
                             </tr>
                             <tr class='table-data'>
                                <td>27.
                                </td>
                                <td>Electronic warfare ﴾EW﴿ engineering                    
                                </td>
                             </tr>
                             <tr class='table-data'>
                                <td>28.
                                </td>
                                <td> Electronics engineering
                                </td>
                             </tr>
                             <tr class='table-data'>
                                <td>29.
                                </td>
                                <td>Engineering physics ﴾or Engineering science﴿
                                </td>
                             </tr>
                             <tr class='table-data'>
                                <td>30.
                                </td>
                                <td>Environmental engineering
                                </td>
                             </tr>
                             <tr class='table-data'>
                                <td>31.
                                </td>
                                <td>EFire protection engineering
                                </td>
                             </tr>
                             <tr class='table-data'>
                                <td>32.
                                </td>
                                <td>Food process engineering
                                </td>
                             </tr>
                             <tr class='table-data'>
                                <td>33.
                                </td>
                                <td>Forensic engineering
                                </td>
                             </tr>
                             <tr class='table-data'>
                                <td>34.
                                </td>
                                <td>Forest engineering
                                </td>
                             </tr>
                             <tr class='table-data'>
                                <td>35.
                                </td>
                                <td>Genetic engineering
                                </td>
                             </tr>
                             <tr class='table-data'>
                                <td>36.
                                </td>
                                <td>Geomatrics engineering
                                </td>
                             </tr>
                             <tr class='table-data'>
                                <td>37.
                                </td>
                                <td>Geotechnical engineering
                                </td>
                             </tr>
                          </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <div >
                     <br><br><br><br><br><br>
                     <div>
                        <div class='table-flex mt-5 pt-3'>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                                 <tr class='table-data'>
                                    <td class='space-number'>38.
                                    </td>
                                    <td>Industrial engineering</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>39.
                                    </td>
                                    <td> Information technology Information</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>40.
                                    </td>
                                    <td>Instrumentation engineering Instrumentation </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>41.
                                    </td>
                                    <td>Landscape engineering See: Landscape Architecture</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>42.
                                    </td>
                                    <td>Logistic engineering
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>43.
                                    </td>
                                    <td>Manufacturing engineering Production                      
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>44.
                                    </td>
                                    <td> Marine engineering
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>45.
                                    </td>
                                    <td>Materials engineering
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>46.
                                    </td>
                                    <td>Mechanical engineering
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>47.
                                    </td>
                                    <td>Mechatronics
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>48.
                                    </td>
                                    <td>Microsystems’s engineering
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>49.
                                    </td>
                                    <td>Military engineering
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>50.
                                    </td>
                                    <td>Minerals process engineering
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>51.
                                    </td>
                                    <td>Mining engineering 
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>52.
                                    </td>
                                    <td>Nanoengineering                   
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>53.
                                    </td>
                                    <td>Naval architecture
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>54.
                                    </td>
                                    <td>Nuclear engineering
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>55.
                                    </td>
                                    <td>Ocean engineering</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>56.
                                    </td>
                                    <td>Optical engineering                   
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>57.
                                    </td>
                                    <td>Paper engineering
                                    </td>
                                 </tr>
                              </table>
                           </div>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                                 <tr class='table-data'>
                                    <td class='space-number'>58.
                                    </td>
                                    <td>Petroleum engineering
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>59.
                                    </td>
                                    <td>Plastics engineering</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>60.
                                    </td>
                                    <td> Preservation engineering Preservation                   
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>61.
                                    </td>
                                    <td> Quality assurance engineering ﴾or Quality engineering﴿
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>62.
                                    </td>
                                    <td>Reliability engineering
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>63.
                                    </td>
                                    <td>Renovation engineering Renovation
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>64.
                                    </td>
                                    <td>Residential engineering
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>65.
                                    </td>
                                    <td>Restoration engineering Restoration
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>66.
                                    </td>
                                    <td>Retro‐engineering
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>67.
                                    </td>
                                    <td>Safety engineering
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>68.
                                    </td>
                                    <td>Security engineering
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>69.
                                    </td>
                                    <td>Sewage engineering
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>70.
                                    </td>
                                    <td>Software engineering
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>71.
                                    </td>
                                    <td>Support engineering
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>72.
                                    </td>
                                    <td> Surveying
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>73.
                                    </td>
                                    <td>Structural engineering
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>74.
                                    </td>
                                    <td>Systems engineering ﴾or Systems design engineering﴿
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>75.
                                    </td>
                                    <td>Transportation engineering ﴾or Transport engineering﴿
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>76.
                                    </td>
                                    <td>Transportation
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>77.
                                    </td>
                                    <td>Value engineering See also engineering society,
                                       Engineering topics
                                    </td>
                                 </tr>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br><br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>  Banking & Finance </h1>
                  </div>
                  <div class='img-center'>
                     <br><br>
                     <div>
                        <p class='text-style'>
                           Banking & Finance – With the fast growing world, ways of making money are increasing
                           rapidly. This has given rise to fast-paced world of money that needs to be regulated. This
                           maintenance and regulation of money, shares, investments, debit, credit etc, is done
                           through banking and finance. Banking encircles all the bank related jobs and knowledge.
                           Finance is tells us about the liquidity in market in terms of money or any assets.
                        </p>
                        <br><br>
                        <div class='table-flex'>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                                 <tr class='table-data'>
                                    <td class='space-number'>1.
                                    </td>
                                    <td>Accountant</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>2.
                                    </td>
                                    <td>Accounts Assistant </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>3.
                                    </td>
                                    <td> Assistant Accountant </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>4.
                                    </td>
                                    <td>Auditor </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>5.
                                    </td>
                                    <td>Bank Cashier/Clerk</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>6.
                                    </td>
                                    <td> Bank Manager
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>7.
                                    </td>
                                    <td>Bookkeeper                     
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>8.
                                    </td>
                                    <td> Budget Analysts
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>9.
                                    </td>
                                    <td>Chief Finance Officer 
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>10.
                                    </td>
                                    <td>Controller
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>11.
                                    </td>
                                    <td>Cost Estimator
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>12.
                                    </td>
                                    <td>Finance Administrator 
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>13.</td>
                                    <td>Finance Associate
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>14.
                                    </td>
                                    <td> Finance Lawyer</td>
                                 </tr>
                              </table>
                           </div>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                                 <tr class='table-data'>
                                    <td class='space-number'>15.
                                    </td>
                                    <td>Finance Manager</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>16.
                                    </td>
                                    <td> Financial Analyst
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>17.
                                    </td>
                                    <td> Insurance Underwriter
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>18.
                                    </td>
                                    <td> Investment Banker</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>19.
                                    </td>
                                    <td>Loan Officer                      
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>20.
                                    </td>
                                    <td> Mortgage Advisor
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>21.
                                    </td>
                                    <td> Payroll Administrator
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>22.
                                    </td>
                                    <td> Personal Banker</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>23.
                                    </td>
                                    <td>Personal Relationship Manager                     
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>24.
                                    </td>
                                    <td> Procurement Manager
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>25.
                                    </td>
                                    <td>Stockbroker
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>26.
                                    </td>
                                    <td>Tax Examiner</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>27.
                                    </td>
                                    <td>Treasury Analyst                   
                                    </td>
                                 </tr>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br><br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'> Designing </h1>
                  </div>
                  <div class='img-center'>
                     <div>
                        <p class='text-style'>
                           Designing – With growing modern world comes the demand of something new. In almost
                           fields, need of designing is growing. Be it a glamour world or the animated movies we
                           watch, the beautiful graphics we see, all have major role of designs. Designing is the field
                           for creative people and it is a lot more than what people get of it.
                        </p>
                        <br><br>
                        <div class='table-flex'>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                                 <tr class='table-data'>
                                    <td class='space-number'>1.
                                    </td>
                                    <td> Graphic designer</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>2.
                                    </td>
                                    <td>User experience ﴾UX﴿ designer </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>3.
                                    </td>
                                    <td> User interface ﴾UI﴿ designer  </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>4.
                                    </td>
                                    <td>Photographer </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>5.
                                    </td>
                                    <td>Interior designer</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>6.
                                    </td>
                                    <td>Multimedia artist & animator 
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>7.
                                    </td>
                                    <td>Art director                      
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>8.
                                    </td>
                                    <td> Advertising & promotions manager
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>9.
                                    </td>
                                    <td>Fashion designer
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>10.
                                    </td>
                                    <td>Film & video editor
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>11.
                                    </td>
                                    <td> Advertising manager 
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>12.
                                    </td>
                                    <td> Copywriter
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>13.</td>
                                    <td>Illustrator 
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>14.
                                    </td>
                                    <td> Tattoo artist</td>
                                 </tr>
                              </table>
                           </div>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                                 <tr class='table-data'>
                                    <td class='space-number'>15.
                                    </td>
                                    <td> Marketing manager</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>16.
                                    </td>
                                    <td> Makeup artist
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>17.
                                    </td>
                                    <td> Industrial designer
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>18.
                                    </td>
                                    <td> Art director</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>19.
                                    </td>
                                    <td>Web developer                    
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>20.
                                    </td>
                                    <td> Journalist
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>21.
                                    </td>
                                    <td> Building architect
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>22.
                                    </td>
                                    <td> Video game designer</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>23.
                                    </td>
                                    <td>Social media marketer                    
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>24.
                                    </td>
                                    <td> Ethical hacker
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>25.
                                    </td>
                                    <td>Software developer
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>26.
                                    </td>
                                    <td> Animator</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>27.
                                    </td>
                                    <td> Painter                  
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>28.
                                    </td>
                                    <td> Actor                  
                                    </td>
                                 </tr>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br><br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>Business Entrepreneur </h1>
                  </div>
                  <div class='img-center'>
                     <div>
                        <p class='text-style'>
                           Business Entrepreneur – Gone are the days when people would rely on single source of
                           income. Today everyone wants to be their own boss. And to be your own boss the only
                           way is to have a business of your own. The scope in this field is tremendous. Following is
                           a long list which one can think of, if they desire to become an entrepreneur.
                        </p>
                        <br><br>
                        <div class='table-flex'>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                                 <tr class='table-data'>
                                    <td class='space-number'>1.
                                    </td>
                                    <td>Social Media Consulting</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>2.
                                    </td>
                                    <td>PR and Marketing </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>3.
                                    </td>
                                    <td> Service Industry  </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>4.
                                    </td>
                                    <td>Online Business</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>5.
                                    </td>
                                    <td>Helping Special‐Needs Individuals</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>6.
                                    </td>
                                    <td>Software and Cloud Services
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>7.
                                    </td>
                                    <td> Management Consultant                     
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>8.
                                    </td>
                                    <td> Digital Marketing Manager
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>9.
                                    </td>
                                    <td>Financial Analyst
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>10.
                                    </td>
                                    <td>Data Scientist
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>11.
                                    </td>
                                    <td> Business Writer 
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>12.
                                    </td>
                                    <td>Investment Management
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>13.</td>
                                    <td>Business Teacher
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>14.
                                    </td>
                                    <td>  Actuary</td>
                                 </tr>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br>
                  <div class='management-heading '>
                     <h1 class='top-heading'> MANAGEMENT </h1>
                  </div>
                  <div class='img-center'>
                   
                     <div>
                        <p class='text-style'>
                           Management – Every type of task needs one main handler. With increasing number of
                           professional fields role of managers has become very crucial. Standard of living has
                           increased leading to lavish lifestyles. People have started their own business. Each of
                           these requires a manager to manage. Management is one of the major and fastest
                           growing field in professional world.
                        </p>
                      
                        <div class='table-flex'>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                                 <tr class='table-data'>
                                    <td class='space-number'>1.
                                    </td>
                                    <td>Chief Executive</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>2.
                                    </td>
                                    <td>Computer and Information Systems Manager </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>3.
                                    </td>
                                    <td> Marketing Manager  </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>4.
                                    </td>
                                    <td>Architectural and Engineering Manager</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>5.
                                    </td>
                                    <td>Interior designer</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>6.
                                    </td>
                                    <td>Natural Sciences Manager
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>7.
                                    </td>
                                    <td>Sales Manager                 
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>8.
                                    </td>
                                    <td> Compensation and Benefits
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>9.
                                    </td>
                                    <td>Public Relations/Fundraising Manager
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>10.
                                    </td>
                                    <td>General and Operations Manager
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>11.
                                    </td>
                                    <td> Account manager
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>12.
                                    </td>
                                    <td> Actuary
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>13.</td>
                                    <td>Administrative Director
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>14.
                                    </td>
                                    <td> Advertising Manager</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>15.
                                    </td>
                                    <td> Airport Manager</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>16.
                                    </td>
                                    <td> Art Gallery Curator
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>17.
                                    </td>
                                    <td>  Artist Manager
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>18.
                                    </td>
                                    <td> Bank Manager</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>19.
                                    </td>
                                    <td> Bar Manager                
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>20.
                                    </td>
                                    <td>  Blogger
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>21.
                                    </td>
                                    <td> Bookstore Manager
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>22.
                                    </td>
                                    <td> Box Office Manager</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>23.
                                    </td>
                                    <td>Business Analyst                  
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>24.
                                    </td>
                                    <td> Business Ethics Consultant
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>25.
                                    </td>
                                    <td> Chief Executive Officer ﴾CEO﴿
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>26.
                                    </td>
                                    <td> Chief Information Officer ﴾CIO﴿</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>27.
                                    </td>
                                    <td> Chief Operating Officer ﴾COO﴿                
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>28.
                                    </td>
                                    <td> City Councillor                  
                                    </td>
                                 </tr>
                              </table>
                           </div>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                                 <tr class='table-data'>
                                    <td class='space-number'>29.
                                    </td>
                                    <td> City Manager                 
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>30.
                                    </td>
                                    <td> Community Services Director                 
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>31.
                                    </td>
                                    <td> Construction Manager                
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>32.
                                    </td>
                                    <td> Consumer Advocate                
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>33.
                                    </td>
                                    <td> Contract Administrator               
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>34.
                                    </td>
                                    <td> Corporate Lawyer               
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>35.
                                    </td>
                                    <td> Corporate Social Responsibility Manager                
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>36.
                                    </td>
                                    <td> Dance Studio Owner               
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>37.
                                    </td>
                                    <td> Department Manager               
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>38.
                                    </td>
                                    <td>  Director of Strategy             
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>39.
                                    </td>
                                    <td> Director of University Admissions           
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>40.
                                    </td>
                                    <td> Education Programs Administrator              
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>41.</td>
                                    <td> Employee Relations Officer </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>42.</td>
                                    <td>Entertainment Coordinator</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>43.</td>
                                    <td> Entrepreneur  </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>44.</td>
                                    <td> Event Planner </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>45.</td>
                                    <td> Facilitator </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>46.</td>
                                    <td> Food Production Manager</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>47.</td>
                                    <td>Food Service Manager </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>48.</td>
                                    <td> Funeral Director </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>49.</td>
                                    <td>  Gym Manager </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>50.</td>
                                    <td> Health Care Consultant</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>51.</td>
                                    <td>  Health Services Manager  </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>52.
                                    </td>
                                    <td>Hotel Manager</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>53.
                                    </td>
                                    <td>Human Resources Assistant </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>54.
                                    </td>
                                    <td> Human Resources Coordinator  </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>55 .
                                    </td>
                                    <td> Importer/Exporter
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>56.
                                    </td>
                                    <td> Industrial Relations Officer
                                    </td>
                                 </tr>
                                
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br><br>
                  <div>
                     <div>
                        <div class='table-flex mt-5'>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                              <tr class='table-data'>
                              <td class='space-number'>57.
                              </td>
                              <td>Insurance Manager
                              </td>
                           </tr>
                           <tr class='table-data'>
                              <td>58.
                              </td>
                              <td>Intellectual Property Manager                
                              </td>
                           </tr>
                                 <tr class='table-data'>
                                    <td>59.
                                    </td>
                                    <td> International Bank Manager
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>60.
                                    </td>
                                    <td>ISO Auditor
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>61.
                                    </td>
                                    <td>Land Agent
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>62.
                                    </td>
                                    <td> Lawyer
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>63.
                                    </td>
                                    <td>  Logistics Assistant
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>64.</td>
                                    <td>Maintenance Manager
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>65.
                                    </td>
                                    <td>  Management Analyst
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>66.
                                    </td>
                                    <td> Management Consultant
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>67.
                                    </td>
                                    <td>Manufacturing Executive
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>68.
                                    </td>
                                    <td> Manufacturing Manager
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>69.
                                    </td>
                                    <td> Market Researcher
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>70.
                                    </td>
                                    <td>Marketing Assistant
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>71.
                                    </td>
                                    <td>Marketing Coordinator
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>72.
                                    </td>
                                    <td>Materials Planner
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>73.
                                    </td>
                                    <td>Mayor
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>74.
                                    </td>
                                    <td>Mediator                    
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>75.
                                    </td>
                                    <td>Office Manager
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>76.
                                    </td>
                                    <td>Operations Manager
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>77.
                                    </td>
                                    <td>Personnel Manager
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>78.
                                    </td>
                                    <td> Principal
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>79.
                                    </td>
                                    <td>Procurement Manager
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>80.</td>
                                    <td>Producer</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>81.</td>
                                    <td> Product Analyst</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>82.</td>
                                    <td> Production Coordinator</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>83.</td>
                                    <td> Production Manager</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>84.</td>
                                    <td> Project Assistant</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>85.</td>
                                    <td>Project Consultant</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>86.</td>
                                    <td> Project Manager</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>87.</td>
                                    <td>Project Supervisor</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>88.</td>
                                    <td>PPromotions Manager</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>89.</td>
                                    <td>Property Manager</td>
                                 </tr>
                                
                                
                              </table>
                           </div>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                              <tr class='table-data'>
                              <td class='space-number'>90.</td>
                              <td>90 Public Health Director</td>
                           </tr>
                           <tr class='table-data'>
                              <td>91.</td>
                              <td> Public Works Supervisor</td>
                           </tr>
                              <tr class='table-data'>
                              <td>92.</td>
                              <td>Publisher</td>
                           </tr>
                           <tr class='table-data'>
                              <td>93.</td>
                              <td>Publishing Rights Manager</td>
                           </tr>
                                 <tr class='table-data'>
                                    <td>94.</td>
                                    <td>Quality Control Specialist   </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>95.</td>
                                    <td>Radio Program Producer</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>96.</td>
                                    <td>Radio Station Manager</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>97.</td>
                                    <td>Real Estate Developer</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>98.</td>
                                    <td>Realtor</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>99.</td>
                                    <td>Record Sales Manager</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>100.</td>
                                    <td>Records Manager</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>101.</td>
                                    <td>Recreation and Sports Director  </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>102.</td>
                                    <td> Recruiter</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>103.</td>
                                    <td>Regulatory Affairs Manager</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>104.</td>
                                    <td>Restaurant Manager</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>105.
                                    </td>
                                    <td> Restaurateur
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>106.
                                    </td>
                                    <td> Retail Manager
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>107.
                                    </td>
                                    <td> Retail Sales Associate
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>108.
                                    </td>
                                    <td>  Safety Coordinator
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>109.
                                    </td>
                                    <td> Sales Manager
                                 </tr>
                                 <tr class='table-data'>
                                    <td>110.
                                    </td>
                                    <td>  Sales Representative
                                 </tr>
                                 <tr class='table-data'>
                                    <td>111.
                                    </td>
                                    <td>   Site Manager
                                 </tr>
                                 <tr class='table-data'>
                                    <td>112.
                                    </td>
                                    <td>  Small Business Owner
                                 </tr>
                                 <tr class='table-data'>
                                    <td>113.
                                    </td>
                                    <td>Spa Manager
                                 </tr>
                                 </tbody>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>115.
                                    </td>
                                    <td>Sports Facility Manager
                                 </tr>
                                 <tr class='table-data'>
                                    <td>116.
                                    </td>
                                    <td>Staff Coordinator
                                 </tr>
                                 <tr class='table-data'>
                                    <td>117.
                                    </td>
                                    <td>Strategic Planner
                                 </tr>
                                 <tr class='table-data'>
                                    <td>118.
                                    </td>
                                    <td>Textiles Production Manager
                                 </tr>
                                 <tr class='table-data'>
                                    <td>119.
                                    </td>
                                    <td>Trade Commissioner
                                 </tr>
                                 <tr class='table-data'>
                                    <td>120.
                                    </td>
                                    <td>Travel Agency Manager
                                 </tr>
                                 <tr class='table-data'>
                                    <td>121.
                                    </td>
                                    <td>University President
                                 </tr>
                                 <tr class='table-data'>
                                    <td>122.
                                    </td>
                                    <td>  University Professor
                                 </tr>
                                 <tr class='table-data'>
                                 <td>123.
                                 </td>
                                 <td>  Wedding Planner
                              </tr>
                                
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br><br> <br><br>
                  <div class='table-flex mt-5 pt-4'>
                           <div class='table-engineering'>
                  <table class='pdf-table'>
                
               <tr class='table-data'>
                  <td class='space-number'>124.
                  </td>
                  <td>Human resources manager
               </tr>
               <tr class='table-data'>
<td>125.
</td>
<td>Marketing assistant
</tr>
<tr class='table-data'>
<td>126.
</td>
<td> Accountants
</tr>
<tr class='table-data'>
<td>127.
</td>
<td>Secretary
</tr>

</table>
</div>
<div class='table-engineering'>
<table class='pdf-table'>

<tr class='table-data'>
<td>128.
</td>
<td>Entrepreneur/small business owner
</tr>
<tr class='table-data'>
<td>129.
</td>
<td> Real estate agent
</tr>
<tr class='table-data'>
<td>130.
</td>
<td>  Business development manager
</tr></table>
</div>
</div>




                  <div class='sign-heading'>
                     <h1 class='top-heading'> EDUCATION </h1>
                  </div>
                  <div class='img-center'>
                     <div>
                        <p class='text-style'>
                           Education – There was a time when career options were limited because subjects to be
                           studied were limited. But today with establishment of such large number of subjects
                           there is need of teaching staff in all of them. Not only this, area of education is not just
                           about teachers but much more than that.
                        </p>
                        <br>
                        <div class='table-flex'>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                                 <tr class='table-data'>
                                    <td class='space-number'>1.
                                    </td>
                                    <td>School counseling
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>2.
                                    </td>
                                    <td>Educational leadership </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>3.
                                    </td>
                                    <td> Education technology</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>4.
                                    </td>
                                    <td> Educational psychology</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>5.
                                    </td>
                                    <td>Pedagogy</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>6.
                                    </td>
                                    <td>Adult education
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>7.
                                    </td>
                                    <td> Postsecondary Teacher             
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>8.
                                    </td>
                                    <td> Postsecondary Education Administrator
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>9.
                                    </td>
                                    <td>Curriculum Developer
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>10.
                                    </td>
                                    <td>Schools Counsellor
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>11.
                                    </td>
                                    <td> Special Education Teacher
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>12.
                                    </td>
                                    <td> Education administration
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>13.</td>
                                    <td> College Professor
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>14.
                                    </td>
                                    <td>  Elementary School Teacher</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>15.
                                    </td>
                                    <td>Music Teacher</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>16.
                                    </td>
                                    <td> PE Teacher
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>17.
                                    </td>
                                    <td> School Administrator
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>18.
                                    </td>
                                    <td> School Counsellor</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>19.
                                    </td>
                                    <td>School Librarian             
                                    </td>
                                 </tr>
                                 
                                
                                
                              </table>
                           </div>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                              <tr class='table-data'>
                                    <td class='space-number'>20.
                                    </td>
                                    <td> School Secretary
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>21.
                                    </td>
                                    <td> Superintendent
                                    </td>
                                 </tr>
                              <tr class='table-data'>
                              <td>22.
                              </td>
                              <td> Teaching Assistant</td>
                           </tr>
                           <tr class='table-data'>
                              <td>23.
                              </td>
                              <td>Vice Principal                
                              </td>
                           </tr>
                              <tr class='table-data'>
                              <td>24.
                              </td>
                              <td> Health educators
                              </td>
                           </tr>
                           <tr class='table-data'>
                              <td>25.
                              </td>
                              <td> Career teacher
                              </td>
                           </tr>
                           <tr class='table-data'>
                              <td>26.
                              </td>
                              <td> Technical education teacher﴿</td>
                           </tr>
                                 <tr class='table-data'>
                                    <td>27.
                                    </td>
                                    <td>  Adult literacy and GED teachers             
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>28.
                                    </td>
                                    <td>Academic Adviser              
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>29.
                                    </td>
                                    <td>Academic Support Coordinator              
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>30.
                                    </td>
                                    <td>  Administrator             
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>31.
                                    </td>
                                    <td> Admissions Assistant              
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>32.
                                    </td>
                                    <td>  Admissions Representative              
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>33.
                                    </td>
                                    <td> Adjunct Professor             
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>34.
                                    </td>
                                    <td>  Adviser             
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>35.
                                    </td>
                                    <td> After‐School Program Aide               
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>36.
                                    </td>
                                    <td>After‐School Program Coordinator             
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>37.
                                    </td>
                                    <td>Assistant Coach             
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>38.
                                    </td>
                                    <td>  Assistant Dean            
                                    </td>
                                 </tr>
                                
                                 
                                
                               
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br>
                  <div>
                     <div>
                        <br><br> <br><br>  <br><br>
                        <div class='table-flex'>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                              <tr class='table-data'>
                              <td class='space-number'>39.
                              </td>
                              <td> Assistant Instructor         
                              </td>
                           </tr>
                           <tr class='table-data'>
                              <td>40.
                              </td>
                              <td> Assistant Principal            
                              </td>
                           </tr>
                              <tr class='table-data'>
                                    <td>41.</td>
                                    <td>Employee Relations Officer </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>42.</td>
                                    <td>Assistant Preschool Teacher</td>
                                 </tr>
                              <tr class='table-data'>
                              <td>43.</td>
                              <td>Assistant Professor </td>
                           </tr>
                           <tr class='table-data'>
                              <td>44.</td>
                              <td> Assistant Registrar </td>
                           </tr>
                           <tr class='table-data'>
                              <td>45.</td>
                              <td> Associate Dean </td>
                           </tr>
                           <tr class='table-data'>
                              <td>46.</td>
                              <td>Associate Professor</td>
                           </tr>
                              <tr class='table-data'>
                              <td>47.</td>
                              <td> Career Counsellor</td>
                           </tr>
                           <tr class='table-data'>
                              <td>48.</td>
                              <td> Child Care Assistant</td>
                           </tr>
                           <tr class='table-data'>
                              <td>49.</td>
                              <td>  Child Care Centre Teacher </td>
                           </tr>
                           <tr class='table-data'>
                              <td>50.</td>
                              <td>Coach</td>
                           </tr>
                           <tr class='table-data'>
                              <td>51.</td>
                              <td>Crossing Guard</td>
                           </tr>
                           <tr class='table-data'>
                              <td>52.</td>
                              <td>Day Care Assistant</td>
                           </tr>
                                 <tr class='table-data'>
                                    <td>53.
                                    </td>
                                    <td>Day Care centre Teacher
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>54.
                                    </td>
                                    <td>Dean </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>55.
                                    </td>
                                    <td> Driver Education Teacher</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>56.
                                    </td>
                                    <td>Education Coordinator</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>57.
                                    </td>
                                    <td>Education Specialist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>58.
                                    </td>
                                    <td>Education Technician
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>59.
                                    </td>
                                    <td>  Educator            
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>60.
                                    </td>
                                    <td> Financial Aid Administrator
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>61.
                                    </td>
                                    <td>Food Service Aide
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>62.
                                    </td>
                                    <td>Food Service Coordinator
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>63.
                                    </td>
                                    <td> Food Service Manager
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>64.
                                    </td>
                                    <td>Guidance Counsellor
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>65.</td>
                                    <td>  Instructor
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>66.
                                    </td>
                                    <td> Instructional Assistant</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>67.
                                    </td>
                                    <td>Lead Teacher</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>68.
                                    </td>
                                    <td> Lunch Monitor
                                    </td>
                                 </tr>
                                
                               
                               
                              </table>
                           </div>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                              <tr class='table-data'>
                              <td class='space-number'>69.
                              </td>
                              <td>  Preschool Assistant Teacher
                              </td>
                           </tr>
                           <tr class='table-data'>
                              <td>70.
                              </td>
                              <td>Preschool Director</td>
                           </tr>
                              <tr class='table-data'>
                              <td>71.
                              </td>
                              <td>Preschool Group Leader          
                              </td>
                           </tr>
                           <tr class='table-data'>
                              <td>73.
                              </td>
                              <td>Preschool Specialist
                              </td>
                           </tr>
                              <tr class='table-data'>
                              <td>74.
                              </td>
                              <td> Preschool Teacher
                              </td>
                           </tr>
                           <tr class='table-data'>
                              <td>75.
                              </td>
                              <td>Principal</td>
                           </tr>
                           <tr class='table-data'>
                              <td>76.
                              </td>
                              <td>Program Assistant             
                              </td>
                           </tr>
                                 <tr class='table-data'>
                                    <td>77.
                                    </td>
                                    <td>Program Coordinator
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>78.
                                    </td>
                                    <td> Registrar
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>79.
                                    </td>
                                    <td>Residence Hall Manager</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>80.
                                    </td>
                                    <td>  Resource Development Coordinator         
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>81.
                                    </td>
                                    <td>School Administrator          
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>82.
                                    </td>
                                    <td>School Bus Driver         
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>83.
                                    </td>
                                    <td> School Counsellor            
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>84.
                                    </td>
                                    <td>School Librarian            
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>85.
                                    </td>
                                    <td> School Nurse           
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>86.
                                    </td>
                                    <td> School Psychologist           
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>87.
                                    </td>
                                    <td> School Secretary          
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>88.
                                    </td>
                                    <td> School Social Worker             
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>89.
                                    </td>
                                    <td> Special Education Assistant           
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>90.
                                    </td>
                                    <td>Special Education Coordinator          
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>91.
                                    </td>
                                    <td>  Substitute Teacher          
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>92.
                                    </td>
                                    <td> Superintendent        
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>93.
                                    </td>
                                    <td>  Superintendent of Schools          
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>94.</td>
                                    <td>Teacher </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>95.</td>
                                    <td>Teacher Aide</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>96.</td>
                                    <td>Teacher Assistant</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>97.</td>
                                    <td>  Teaching Assistant</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>98.</td>
                                    <td>  Tutor </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>99.</td>
                                    <td>Youth Care Worker</td>
                                 </tr>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'> HUMANITIES(ART) </h1>
                  </div>
                  <div class='img-center'>
                     <br><br>
                     <div>
                        <p class='text-style'>
                           Humanities – Art, music, dance etc used to be the hobbies of people at a point of time.
                           But now each of them is full with job opportunities. There are reality shows to get the
                           talented people in music and dance. Various form of art and crafts have evolved over the
                           time. In sports too there is a lot of scoped at national and international level.
                        </p>
                        <br><br>
                        <div class='table-flex'>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                                 <tr class='table-data'>
                                    <td class='space-number'>1.
                                    </td>
                                    <td>Art Acquisitions Specialist/Art Investor
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>2.
                                    </td>
                                    <td>Advertising Artist </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>3.
                                    </td>
                                    <td>Animator/Cartoonist/Character Artist/Multimedia Artist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>4.
                                    </td>
                                    <td>Antique Art Appraiser/Estate Art Appraiser</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>5.
                                    </td>
                                    <td> Antique Art Restorer</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>6.
                                    </td>
                                    <td>Architectural Designer
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>7.
                                    </td>
                                    <td> Art Auctioneer            
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>8.
                                    </td>
                                    <td>Art Director
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>9.
                                    </td>
                                    <td>Art Gallery Curator
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>10.
                                    </td>
                                    <td>Art Historian
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>11.
                                    </td>
                                    <td> Art Librarian
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>12.
                                    </td>
                                    <td> Art Teacher
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>13.</td>
                                    <td>  Art Therapist
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>14.
                                    </td>
                                    <td>   Artist Agent</td>
                                 </tr>
                              </table>
                           </div>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                                 <tr class='table-data'>
                                    <td class='space-number'>15.
                                    </td>
                                    <td> Arts Organization Fundraiser</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>16.
                                    </td>
                                    <td>Commercial Artist/Layout Artist/Graphic Artist
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>17.
                                    </td>
                                    <td> Courtroom Artist
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>18.
                                    </td>
                                    <td> Craft and Fine Artists/Painters/Glassblowers/Potters</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>19.
                                    </td>
                                    <td>Creative Art Director           
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>20.
                                    </td>
                                    <td> Illustrator
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>21.
                                    </td>
                                    <td> Logo Designer
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>22.
                                    </td>
                                    <td> Museum Art Archivist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>23.
                                    </td>
                                    <td> Museum Art Curator            
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>24.
                                    </td>
                                    <td> Museum Art Manager or Director
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>25.
                                    </td>
                                    <td> Police Sketch Artist
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>26.
                                    </td>
                                    <td> Portrait Artist﴿</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>27.
                                    </td>
                                    <td>   Sketch Artist            
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>28.
                                    </td>
                                    <td>Tattoo Artist             
                                    </td>
                                 </tr>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br><br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>ART (FASHION) </h1>
                  </div>
                  <div>
                     <div>
                        <br><br>
                        <div class='table-flex'>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                                 <tr class='table-data'>
                                    <td class='space-number'>1.
                                    </td>
                                    <td>Fashion stylist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>2.
                                    </td>
                                    <td>Sales assistant </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>3.
                                    </td>
                                    <td> Fashion journalist/writer </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>4.
                                    </td>
                                    <td>Personal assistant</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>5.
                                    </td>
                                    <td>Garment technologist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>6.
                                    </td>
                                    <td> Visual merchandiser
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>7.
                                    </td>
                                    <td>Model                    
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>8.
                                    </td>
                                    <td> Graphic designer
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>9.
                                    </td>
                                    <td> Fashion photographer
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>10.
                                    </td>
                                    <td> Illustrator
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>11.
                                    </td>
                                    <td>  Digital media specialist
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>12.
                                    </td>
                                    <td>Fashion PR coordinator
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>13.</td>
                                    <td> Fashion merchandiser
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>14.
                                    </td>
                                    <td> Trend forecaster</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>15.
                                    </td>
                                    <td>  Retail buyer
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>16.
                                    </td>
                                    <td> Textile designer
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>17.
                                    </td>
                                    <td>Web developer
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>18.</td>
                                    <td>eCommerce manager
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>19.
                                    </td>
                                    <td> Fashion designer</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>20.
                                    </td>
                                    <td> Boutique owner</td>
                                 </tr>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br><br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>ART (WRITING) </h1>
                  </div>
                  <div>
                     <br><br>
                     <div class='table-flex'>
                        <div class='table-engineering'>
                           <table class='pdf-table'>
                              <tr class='table-data'>
                                 <td class='space-number'>1.
                                 </td>
                                 <td>Advertising Copywriter</td>
                              </tr>
                              <tr class='table-data'>
                                 <td>2.
                                 </td>
                                 <td>Executive Assistant </td>
                              </tr>
                              <tr class='table-data'>
                                 <td>3.
                                 </td>
                                 <td>Food and Arts Reviewer </td>
                              </tr>
                              <tr class='table-data'>
                                 <td>4.
                                 </td>
                                 <td> Ghost‐writer</td>
                              </tr>
                              <tr class='table-data'>
                                 <td>5.
                                 </td>
                                 <td> Grant Proposal Writer</td>
                              </tr>
                              <tr class='table-data'>
                                 <td>6.
                                 </td>
                                 <td> Media Relations Specialist
                                 </td>
                              </tr>
                           </table>
                        </div>
                     </div>
                  </div>
                  <div>
                     <h1 class='sport-heading'>SPORTS </h1>
                  </div>
                  <div>
                     <br><br>
                     <div class='table-flex'>
                        <div class='table-engineering'>
                           <table class='pdf-table'>
                              <tr class='table-data'>
                                 <td class='space-number'>1.
                                 </td>
                                 <td>Sports Statistical Analyst</td>
                              </tr>
                              <tr class='table-data'>
                                 <td>2.
                                 </td>
                                 <td> Sports Agent </td>
                              </tr>
                              <tr class='table-data'>
                                 <td>3.
                                 </td>
                                 <td>Careers in Sports Medicine </td>
                              </tr>
                              <tr class='table-data'>
                                 <td>4.
                                 </td>
                                 <td> Event Coordinator</td>
                              </tr>
                              <tr class='table-data'>
                                 <td>5.
                                 </td>
                                 <td> Sports Media Positions</td>
                              </tr>
                              <tr class='table-data'>
                                 <td>6.
                                 </td>
                                 <td>Sports Marketing
                                 </td>
                              </tr>
                              <tr class='table-data'>
                                 <td>7.
                                 </td>
                                 <td>Facility Operations Manager                  
                                 </td>
                              </tr>
                              <tr class='table-data'>
                                 <td>8.
                                 </td>
                                 <td> Athletic Director
                                 </td>
                              </tr>
                              <tr class='table-data'>
                                 <td>9.
                                 </td>
                                 <td> Coach or Assistant Coach
                                 </td>
                              </tr>
                              <tr class='table-data'>
                                 <td>10.
                                 </td>
                                 <td> Umpire or Referee
                                 </td>
                              </tr>
                              <tr class='table-data'>
                                 <td>11.
                                 </td>
                                 <td>  Sports Announcer
                                 </td>
                              </tr>
                              <tr class='table-data'>
                                 <td>12.
                                 </td>
                                 <td>Fitness Centre Careers
                                 </td>
                              </tr>
                              <tr class='table-data'>
                                 <td>13.</td>
                                 <td>  Sports Announcer/Commentator
                                 </td>
                              </tr>
                              <tr class='table-data'>
                                 <td>14.
                                 </td>
                                 <td>  Sports Radio Show Host</td>
                              </tr>
                              <tr class='table-data'>
                                 <td>15.
                                 </td>
                                 <td> Sports Writer
                                 </td>
                              </tr>
                              <tr class='table-data'>
                                 <td>16.
                                 </td>
                                 <td>Public relation assistant
                                 </td>
                              </tr>
                              <tr class='table-data'>
                                 <td>17.
                                 </td>
                                 <td> Inside Sales Representative
                                 </td>
                              </tr>
                              <tr class='table-data'>
                                 <td>18.</td>
                                 <td>Academic Sports Psychologists
                                 </td>
                              </tr>
                              <tr class='table-data'>
                                 <td>19.
                                 </td>
                                 <td> Clinical Sports Psychologists</td>
                              </tr>
                              <tr class='table-data'>
                                 <td>20.
                                 </td>
                                 <td>Applied Sports Psychologists</td>
                              </tr>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                 
                  <div class='sign-heading'>
                     <h1 class='sport-heading'>MUSIC </h1>
                  </div>
                  <div>
                   
                      <div class='table-flex'>
                        <div class='table-engineering'>
                           <table class='pdf-table'>
                           <tr class='table-data'>
                           <td class='space-number'>1.
                           </td>
                           <td>Singer
                           </td>
                        </tr>
                        <tr class='table-data'>
                           <td>2.
                           </td>
                           <td> Instrumentalist
                           </td>
                        </tr>
                        <tr class='table-data'>
                           <td>3.
                           </td>
                           <td> Songwriter
                           </td>
                        </tr>
                        <tr class='table-data'>
                           <td>4.</td>
                           <td>Composer
                           </td>
                        </tr>
                        <tr class='table-data'>
                           <td>5.
                           </td>
                           <td>Critic</td>
                        </tr>
                        <tr class='table-data'>
                           <td>6.
                           </td>
                           <td>Conductor</td>
                        </tr>
                        </tr>
                        <tr class='table-data'>
                           <td>7.
                           </td>
                           <td>Recording Technician</td>
                        </tr>
                        </tr>
                        <tr class='table-data'>
                           <td>8.
                           </td>
                           <td> Producer</td>
                        </tr>
                        </tr>
                        <tr class='table-data'>
                           <td>9.
                           </td>
                           <td> Publicist</td>
                        </tr>
                        </tr>
                        <tr class='table-data'>
                           <td>10.
                           </td>
                           <td>  Music Therapist</td>
                        </tr>
                        </tr>
                        <tr class='table-data'>
                           <td>11.
                           </td>
                           <td> Recording Engineer</td>
                        </tr>
                        </tr>
                        <tr class='table-data'>
                           <td>12.
                           </td>
                           <td> Artist manager</td>
                        </tr>
                        <tr class='table-data'>
                           <td>13.
                           </td>
                           <td> Music teacher</td>
                        </tr>
                        <tr class='table-data'>
                        <td>14.
                        </td>
                        <td>  Music publicist</td>
                        </tr>
                           </table>
                        </div>
                     </div>
                  </div>
                  <br><br>
                  <div>
                     <h1 class='sport-heading'>DANCE </h1>
                  </div>
                  <div>
                     <br><br>
                     <div class='table-flex'>
                        <div class='table-engineering'>
                           <table class='pdf-table'>
                              <tr class='table-data'>
                                 <td class='space-number'>1.
                                 </td>
                                 <td>Choreographer/Director
                                 </td>
                              </tr>
                              <tr class='table-data'>
                                 <td>2.
                                 </td>
                                 <td> Lighting Designer/Set Designer
                                 </td>
                              </tr>
                              <tr class='table-data'>
                                 <td>3.
                                 </td>
                                 <td> Stage Management/Production Crew
                                 </td>
                              </tr>
                              <tr class='table-data'>
                                 <td>4.</td>
                                 <td>Company Managing/Administration
                                 </td>
                              </tr>
                              <tr class='table-data'>
                                 <td>5.
                                 </td>
                                 <td> General Arts Administration</td>
                              </tr>
                              <tr class='table-data'>
                                 <td>6.
                                 </td>
                                 <td> Dance Writer</td>
                              </tr>
                              </tr>
                              <tr class='table-data'>
                                 <td>7.
                                 </td>
                                 <td>Physical Therapist</td>
                              </tr>
                              </tr>
                              <tr class='table-data'>
                                 <td>8.
                                 </td>
                                 <td>  Massage Therapist</td>
                              </tr>
                              </tr>
                              <tr class='table-data'>
                                 <td>9.
                                 </td>
                                 <td> Graphic Designer</td>
                              </tr>
                              </tr>
                              <tr class='table-data'>
                                 <td>10.
                                 </td>
                                 <td>  Athletic Coach/Personal Trainer</td>
                              </tr>
                              </tr>
                              <tr class='table-data'>
                                 <td>11.
                                 </td>
                                 <td> Costume Designer</td>
                              </tr>
                              </tr>
                              <tr class='table-data'>
                                 <td>12.
                                 </td>
                                 <td> Photographer/Videographer</td>
                              </tr>
                              <tr class='table-data'>
                                 <td>13.
                                 </td>
                                 <td> Group Fitness Instructor</td>
                              </tr>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'> POLITICS and PUBLIC AFFAIRS </h1>
                  </div>
                  <div class='img-center'>
                     <br><br>
                     <div>
                        <p class='text-style'>
                           Politics & Public Affairs – People with good administrative qualities can become part of
                           politics. This field is for the ones who are keen on serving their nation and want to
                           become public servant.<br>
                           Mass and media communication – People with outward personality and strong
                           communication skills can find their dream job in mass and media communication. It is
                           more than just TV journalism. If you have interest to explore people, places and culture
                           and talk about them, this is the career option for you.
                        </p>
                        <br><br>
                        <div class='table-flex'>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                                 <tr class='table-data'>
                                    <td class='space-number'>1.
                                    </td>
                                    <td>Intern/Volunteer</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>2.
                                    </td>
                                    <td> Legislative Aide</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>3.
                                    </td>
                                    <td> Policy Analyst</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>4.
                                    </td>
                                    <td>Communications Coordinator </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>5.
                                    </td>
                                    <td>Pollster
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>6.
                                    </td>
                                    <td> Lobbyist  
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>7.
                                    </td>
                                    <td> Campaign Manager
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>8.
                                    </td>
                                    <td>Political Consultant
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>9.
                                    </td>
                                    <td>Media Strategist
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>10.
                                    </td>
                                    <td>Chief of Staff
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>11.
                                    </td>
                                    <td>Public affairs officers
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>12.
                                    </td>
                                    <td>Indian Administrative Service or IAS
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>13.</td>
                                    <td>Indian Foreign Service or IFS
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>14.
                                    </td>
                                    <td>Indian Police Service or IPS
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>15.
                                    </td>
                                    <td>Indian P & T Accounts & Finance Service
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>16.
                                    </td>
                                    <td> Indian Audit and Accounts Service
                                    </td>
                                 </tr>
                              </table>
                           </div>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                                 <tr class='table-data'>
                                    <td class='space-number'>17.</td>
                                    <td>Indian Revenue Service ﴾Customs and Central Excise
                                       n
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>18.</td>
                                    <td>Indian Revenue Service ﴾Customs and Central Excise
                                       n
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>19.</td>
                                    <td> Indian Revenue Service</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>20.</td>
                                    <td> Indian Ordnance Factories Service</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>21.</td>
                                    <td> Indian Postal Service</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>22.</td>
                                    <td> Indian Civil Accounts Service</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>23.</td>
                                    <td> Indian Railway Traffic Service</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>24.</td>
                                    <td> Indian Railway Accounts Service</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>25.</td>
                                    <td>  Indian Railway Personnel Service</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>26.</td>
                                    <td>  Indian Railway Protection Force</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>27.</td>
                                    <td>  Indian Defence Estates Service</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>28.</td>
                                    <td>   Indian Information Service</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>29.</td>
                                    <td>Indian Trade Service, Group</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>30.</td>
                                    <td>Indian Corporate Law Service</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>31.</td>
                                    <td>Indian Forest Service</td>
                                 </tr>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br>
                  <br>
                  <br>
                  <br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>MASS and MEDIA COMMUNICATION </h1>
                  </div>
                  <div>
                     <br><br>
                     <div>
                        <div class='table-flex'>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                                 <tr class='table-data'>
                                    <td class='space-number'>1.
                                    </td>
                                    <td>Broadcast Technician</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>2.
                                    </td>
                                    <td>News Anchor
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>3.
                                    </td>
                                    <td>Photographer</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>4.
                                    </td>
                                    <td>Public Relations Specialist </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>5.
                                    </td>
                                    <td>Reporter
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>6.
                                    </td>
                                    <td> Translator or Interpreter 
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>7.
                                    </td>
                                    <td>Writers and Editors
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>8.
                                    </td>
                                    <td>Public Relations
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>9.
                                    </td>
                                    <td>Corporate Communications
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>10.
                                    </td>
                                    <td>Advertising
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>11.
                                    </td>
                                    <td>Visual Communications
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>12.
                                    </td>
                                    <td>Marketing
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>13.</td>
                                    <td>Journalism
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>14.
                                    </td>
                                    <td>Journalism
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>15.
                                    </td>
                                    <td>Public Relations
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>16.
                                    </td>
                                    <td> Art Direction
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>17.
                                    </td>
                                    <td>Choreography
                                    </td>
                                 </tr>
                              </table>
                           </div>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                                 <tr class='table-data'>
                                    <td class='space-number'>18.</td>
                                    <td>Direction
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>19.</td>
                                    <td> Film /Drama Production</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>20.</td>
                                    <td> Performing Arts
                                 </tr>
                                 <tr class='table-data'>
                                    <td>21.</td>
                                    <td> Performing Arts</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>22.</td>
                                    <td> Vocal and Instrumental</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>23.</td>
                                    <td> Information, Communication, Entertainment</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>24.</td>
                                    <td>Foreign languages
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>25.</td>
                                    <td> Library Sciences</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>26.</td>
                                    <td>  Advertising</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>27.</td>
                                    <td>   Disc Jockey</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>28.</td>
                                    <td>   Film‐Making</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>29.</td>
                                    <td>Public Relations</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>30.</td>
                                    <td>Publishing and Printing</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>31.</td>
                                    <td> Radio Jockeying</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>32.</td>
                                    <td>Video Jockeying</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>33.</td>
                                    <td>Video Editing</td>
                                 </tr>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>MEDICAL </h1>
                  </div>
                  <div class='img-center'>
                     <br><br>
                     <div>
                        <p class='text-style'>
                           Medical – With rising no of diseases and health problems, jobs in medical field are rising
                           with good opportunities. So may tests are available for body check up. This has led to
                           increasing number of pathologies. A pathology requires many trainers. Similarly in fields
                           like sports, a separate medical staff is required. Similarly many others jobs and fields
                           related to medical are given as follows -
                        </p>
                        <br><br>
                        <div class='table-flex'>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                                 <tr class='table-data'>
                                    <td class='space-number'>1.
                                    </td>
                                    <td>Athletic trainers</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>2.
                                    </td>
                                    <td>Audiologists
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>3.
                                    </td>
                                    <td>Cardiovascular Technologists
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>4.
                                    </td>
                                    <td> Chiropractors </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>5.
                                    </td>
                                    <td>Dental Assistants
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>6.
                                    </td>
                                    <td> Dental Hygienists
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>7.
                                    </td>
                                    <td>Dentists
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>8.
                                    </td>
                                    <td>Diagnostic Medical Sonographers
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>9.
                                    </td>
                                    <td>Dietitians and Nutritionists
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>10.
                                    </td>
                                    <td> EMTs and Paramedics
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>11.
                                    </td>
                                    <td> Home Health and Personal Care Aides
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>12.
                                    </td>
                                    <td> Nursing
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>13.</td>
                                    <td> Registered Nurse
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>14.
                                    </td>
                                    <td>Medical Laboratory Scientists
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>15.
                                    </td>
                                    <td> Massage Therapists
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>16.
                                    </td>
                                    <td> Massage Therapists
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>17.
                                    </td>
                                    <td> Medical Records and Health Information Technicians
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>18.
                                    </td>
                                    <td>Medical Transcriptionists
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>19.
                                    </td>
                                    <td> Medical Transcriptionists
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>20.
                                    </td>
                                    <td> Nursing Aides, Orderlies, and Attendants
                                 </tr>
                                 <tr class='table-data'>
                                    <td>21.
                                    </td>
                                    <td> Occupational Health and Safety Technicians
                                    </td>
                                 </tr>
                              </table>
                           </div>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                                 <tr class='table-data'>
                                    <td class='space-number'>22.</td>
                                    <td> Occupational Therapists</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>23.</td>
                                    <td> Occupational Therapy Assistants and Aides</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>24.</td>
                                    <td>Foreign languages</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>25.</td>
                                    <td>Optometrists</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>26.</td>
                                    <td>Orthotists and Prosthetists</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>27.</td>
                                    <td>Pharmacists</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>28.</td>
                                    <td> Pharmacy Technicians</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>29.</td>
                                    <td>Physical Therapists</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>30.</td>
                                    <td>Physician Assistants</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>31.</td>
                                    <td> Physicians and Surgeons</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>32.</td>
                                    <td>Podiatrists</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>33.</td>
                                    <td>Psychiatric Technicians and Aides</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>34.</td>
                                    <td>Radiation Therapists</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>35.</td>
                                    <td>Radiologic Technologists</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>36.</td>
                                    <td>Recreational Therapists</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>37.</td>
                                    <td>Respiratory Therapists</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>38.</td>
                                    <td>Speech‐Language Pathologists</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>39.</td>
                                    <td> Surgical Technologists</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>40.</td>
                                    <td> Veterinarians</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>41.</td>
                                    <td> Veterinary Technologists and Technicians</td>
                                 </tr>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>PHYSICS and CHEMISTRY </h1>
                  </div>
                  <div class='img-center'>
                     <br><br>
                     <div>
                        <p class='text-style'>
                           Physics & Chemistry – Being major branch of science, Physics and Chemistry have vast
                           job opportunities in the field of research. Various combinations of these subjects with
                           other subjects can fetch you good jobs. Chemistry is crucial for being a chemist, chemical
                           engineer, research in the field of medicines etc. Physics itself has number of sub
                           branches with different job opportunities in each like astronomy, nanotechnology,
                           material science research etc.
                        </p>
                        <br><br>
                        <div class='table-flex'>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                                 <tr class='table-data'>
                                    <td class='space-number'>1.
                                    </td>
                                    <td>Biochemist/Biophysicist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>2.
                                    </td>
                                    <td>Natural Sciences Manager
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>3.
                                    </td>
                                    <td>Chemical Engineer
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>4.
                                    </td>
                                    <td> Middle School Teacher </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>5.
                                    </td>
                                    <td>Nuclear physicist
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>6.
                                    </td>
                                    <td> Environmental Scientist/Specialist
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>7.
                                    </td>
                                    <td>Astronomer
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>8.
                                    </td>
                                    <td>Astronomer
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>9.
                                    </td>
                                    <td>Patent agent
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>10.
                                    </td>
                                    <td> Patent agent
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>11.
                                    </td>
                                    <td>Data scientist
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>12.
                                    </td>
                                    <td> Nursing
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>13.</td>
                                    <td>Laser engineer
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>14.
                                    </td>
                                    <td>Optical engineer
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>15.
                                    </td>
                                    <td> Quantitative research analyst
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>16.
                                    </td>
                                    <td>Solar physicist
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>17.
                                    </td>
                                    <td> Solar physicist
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>18.
                                    </td>
                                    <td>Health physicist
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>19.
                                    </td>
                                    <td> Technical writer
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>20.
                                    </td>
                                    <td>  Process engineer
                                 </tr>
                                 <tr class='table-data'>
                                    <td>21.
                                    </td>
                                    <td> Acoustical engineer
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>22.
                                    </td>
                                    <td> Accelerator operator
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>23.
                                    </td>
                                    <td> Forensic firearms examine
                                    </td>
                                 </tr>
                                
                              </table>
                           </div>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                              <tr class='table-data'>
                              <td class='space-number'>24.
                              </td>
                              <td>Forensic firearms examine
                              </td>
                           </tr>
                           <tr class='table-data'>
                              <td>25.
                              </td>
                              <td> Energy policy analyst
                              </td>
                           </tr>
                                 <tr class='table-data'>
                                    <td>26.</td>
                                    <td>Science journalist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>27.</td>
                                    <td>Agricultural Chemist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>28.</td>
                                    <td> Air Pollution Monitor</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>29.</td>
                                    <td>Assayer</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>30.</td>
                                    <td>Blogger</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>31.</td>
                                    <td>Brewmaster</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>32.</td>
                                    <td> Brewmaster</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>33.</td>
                                    <td> Chemical Engineer</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>34.</td>
                                    <td>Chemical Information Specialist
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>35.</td>
                                    <td>Chemical Oceanographer</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>36.</td>
                                    <td>Chemical Safety Officer</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>37.</td>
                                    <td>Chemical Technician</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>38.</td>
                                    <td>Chemist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>39.</td>
                                    <td> Clinical Chemist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>40.</td>
                                    <td> Clinical Data Analyst/td></td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>41.</td>
                                    <td> Clinical Research Associate</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>42.</td>
                                    <td>  Clinical Research Coordinator</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>43.</td>
                                    <td>  Clinical Technician</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>44.</td>
                                    <td>  Consumer Advocate</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>45.</td>
                                    <td>  Crime Lab Assistant</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>46.</td>
                                    <td>  Dentist</td>
                                 </tr>
                                
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br>
                  <div >
                     <br><br>
                     <div>
                        <br><br>  <br><br>
                        <div class='table-flex'>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                                 <tr class='table-data'>
                                 <td class='space-number'>47.</td>
                                 <td>DNA Analyst</td>
                              </tr>
                              <tr class='table-data'>
                                 <td>48.</td>
                                 <td> Elementary School Teacher</td>
                              </tr>
                              <tr class='table-data'>
                                 <td>49.</td>
                                 <td> Energy Engineer</td>
                              </tr>
                              <tr class='table-data'>
                                 <td>50.</td>
                                 <td> Energy Policy Analyst</td>
                              </tr>
                              <tr class='table-data'>
                                    <td>51.</td>
                                    <td> Energy Researcher</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>52.</td>
                                    <td>Entrepreneur</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>53.</td>
                                    <td>Environmental Chemist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>54.</td>
                                    <td>Flavourist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>55.</td>
                                    <td>Food and Drug Inspector</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>56.</td>
                                    <td>Food Chemist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>57.</td>
                                    <td>Food Safety Auditor</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>58.</td>
                                    <td>Food Scientist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>59.</td>
                                    <td>Food Technologist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>60.</td>
                                    <td>Forensic Chemist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>61.</td>
                                    <td>Forensic Chemist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>62.</td>
                                    <td>Industrial Chemist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>63.</td>
                                    <td>High School Teacher</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>64.</td>
                                    <td>Laboratory Manager</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>65.</td>
                                    <td>Medical Writer</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>66.</td>
                                    <td>Materials Scientist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>67.</td>
                                    <td> Medical Laboratory Technologist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>67.</td>
                                    <td> Methods Development Chemist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>68.</td>
                                    <td> Military Officer</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>69.</td>
                                    <td> Military Officer</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>70.</td>
                                    <td> Nanotechnologist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>71.</td>
                                    <td> New Food Product Developer</td>
                                 </tr>
                                 
                                 
                              </table>
                           </div>
                           <div class='table-engineering'>
                              <table class='pdf-table'>
                              <tr class='table-data'>
                                    <td class='space-number'>72.</td>
                                    <td>  Nuclear Chemist</td>
                                 </tr>
                              <tr class='table-data'>
                              <td>73.</td>
                              <td>  Organic Chemist</td>
                           </tr>
                           <tr class='table-data'>
                              <td>74.</td>
                              <td> Patent Agent</td>
                           </tr>
                           <tr class='table-data'>
                           <td>75.
                           </td>
                           <td>  Patent Agent</td>
                        </tr>
                                 <tr class='table-data'>
                                    <td>76.
                                    </td>
                                    <td>  Pest Control Technician</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>77.
                                    </td>
                                    <td> Petroleum Chemist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>78.
                                    </td>
                                    <td>Pharmaceutical Chemist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>79.
                                    </td>
                                    <td>Pharmacist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>80.
                                    </td>
                                    <td> Pharmacologist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>81.
                                    </td>
                                    <td>  Pulp and Paper Chemist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>82.
                                    </td>
                                    <td> Quality Control Specialist
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>83.
                                    </td>
                                    <td>Regulatory Affairs Manager</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>84.
                                    </td>
                                    <td>Regulatory Affairs Specialist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>85.
                                    </td>
                                    <td>Research Assistant
                                    </td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>86.
                                    </td>
                                    <td>Research Chef</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>87.
                                    </td>
                                    <td>Sales Representative</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>88.
                                    </td>
                                    <td>Science Advisor</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>89.
                                    </td>
                                    <td>Science Writer</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>90.
                                    </td>
                                    <td>Technical Writer</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>91.
                                    </td>
                                    <td>Textile Chemist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>92.
                                    </td>
                                    <td> Toxicologist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>93.
                                    </td>
                                    <td>University Professor</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>94.
                                    </td>
                                    <td>Wastewater Operator</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>95.
                                    </td>
                                    <td>Wastewater Treatment engineer</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>96.
                                    </td>
                                    <td>Water Purification Chemist</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>97.
                                    </td>
                                    <td>Water Quality Analyst</td>
                                 </tr>
                                 <tr class='table-data'>
                                    <td>98.
                                    </td>
                                    <td>Water Quality Control Manager</td>
                                 </tr>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>EVALUATION OF CAREER OPTIONS </h1>
                  </div>
                  <div class='img-center'>
                     <br><br>
                     <div>
                        <p class='text-style'>
                           Having alternatives is great and boosts the confidence of a person. Once the aim is set
                           the opportunities become more apparent, perhaps you may have so many choices but
                           deciding the right and best one is an important question. So how AIMTEST suggests the
                           right one for you?<br><br>
                           Before making any important decision it is better to evaluate self abilities with AIMTEST
                           because career is one of the most meaningful parts of the life. So we have come up with
                           the possible answer i.e. the result of AIMTEST that suggest on the basis of factors that
                           are relevant and best addresses your personality and abilities. The evaluation is based
                           on the key values, technical skills, natural aptitudes, personality and thinking styles,
                           interest and behavior.<br><br>
                           The suggestions are based on rational and emotional levels in terms of the factors
                           aligned with the report of an individual. The conclusion of career is totally based on the
                           cognitive abilities i.e. the first rational level which summarizes the options that matter to
                           you the most. Then after understanding the available options at rational level, AIMTEST
                           look at the things on an emotional level which is revealed by the evaluation of an
                           individual through AIMTEST and then conclude about the best career options that may
                           be valuable for their life skills.<br><br>
                        </p>
                        <br><br>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1666952984/24_zj527s.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='logo-text'>
               <div>
                  <br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>DISCLAIMER </h1>
                  </div>
                  <div class='img-center'>
                     <br><br>
                     <div>
                        <p class='text-style'>
                           This Report contains information obtained from aim test as per the result of the
                           candidate score this may change according to academic performance time by time. The
                           Aim test do not emphasis to make the decision of academic life it merely helps to find
                           right analysis of academic so as to one can mould his future. The decision to follow any
                           instruction, advise, suggestion or recommendation completely depends upon you and
                           you will be solely responsible for the consequences of the same. We as a company or
                           any of its members are not responsible for any consequences under any situations.
                           Before taking any important decision, please refer to your family doctor, teacher,
                           psychiatrist or psychologist. The results are only analytical Thus it should not be used as
                           a stand alone instrument for any important decision-making.<br><br>
                        </p>
                        <br><br>
                     </div>
                  </div>
               </div>
               <div>
                  <br>
                  <div class='sign-heading'>
                     <h1 class='top-heading'>WARNING </h1>
                  </div>
                  <div class='img-center'>
                     <br><br>
                     <div>
                        <p class='text-style'>
                           This work is subject to copyright. All rights reserved. No part of this book may be
                           reproduced or transmitted in any form or by any means, electronic or mechanical,
                           including photocopying, recording or by any information storage and retrieval system,
                           without written permission from the author, except for the inclusion of brief quotations
                           in review. Trademark Product or corporate names may be trademarks .<br><br>
                        </p>
                        <br><br>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class='rela'>
   <div class='px-0'>
      <div size='A4'>
         <img
         // width="200px"
         // height="800px"
         class='third-img'
         src='https://res.cloudinary.com/dgimekhep/image/upload/v1667042613/a_42_wabu1o.jpg'
         />
      </div>
   </div>
   <div class='row'>
      <div class='col-12'>
         <div class='text-absolute'>
            <div class='analysis-text'>
               <div>
                  <div class='margin-pdf'>
                     <h3> ANALYSIS SUMMARY </h3>
                  </div>
                  <br>
                  <div class='segment1'></div>
                  <div class='segmentparent1'></div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
`,
};
const pdfSlice = createSlice({
  name: 'pdf ',
  initialState,
  reducers: {
    postPdfData(state, action) {
      state.pdfInitalValue = action.payload;
    },
    displayButton(state, action) {
      state.displayPrint = action.payload;
    },
  },
});
export const { postPdfData, displayButton } = pdfSlice.actions;
export default pdfSlice.reducer;
