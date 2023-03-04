import { useContext, useMemo, useState } from 'react';

import { Box, Grid, Typography } from '@mui/material';

import { AppContext } from './context/AppContext';
import { randomize } from './utils/helpers';
import { Question } from './context/types';
import QuestionCard from './components/QuestionCard/QuestionCard';
import HeaderButton from './components/HeaderButton/HeaderButton';
import SideButton from './components/SideButton/SideButton';

// used to stringify example scripts
import Debug from './components/Debug/Debug';
const DEBUG = false;

function App() {
  const { isLoading, questions, hidden, showQuestion, hideQuestion } = useContext(AppContext);
  const [counter, setCounter] = useState<number>(0);

  const visibleQuestions: Question[] = useMemo(() => {
    const filtered = questions.filter(q => !hidden.find(hq => hq.id === q.id));
    return randomize(filtered);
  }, [questions, hidden]);

  const showNext = () => {
    if (visibleQuestions.length - 1 > counter)
      setCounter(c => ++c);
  };

  const showLast = () => {
    if (counter > 0)
      setCounter(c => --c);
  };

  const handleArchive = (id: string) => {
    if (visibleQuestions.length - 1 >= counter)
      setCounter(c => --c);
    hideQuestion(id);
  };

  let content;

  if (isLoading)
    content = (<Typography variant='h2' align='center'> Loading ...</Typography>);
  else if (questions.length === 0)
    content = (<Typography variant='h2' align='center'> No questions found</Typography>);
  else if (visibleQuestions.length === 0)
    content = (<Typography variant='h2' align='center'> All questions are hidden</Typography>);
  else
    content = (
      <Box >
        <Grid container justifyContent='center' >

          <Grid item sx={{ display: { xs: 'none', md: 'block' } }} md={2}   >
            <SideButton label='LAST' onClick={showLast} />
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container direction="column" sx={{ minHeight: '100vh', padding: '10px ' }} justifyContent='space-between'>

              <Grid item xs={1}>
                <Grid container justifyContent='space-between' alignItems='center' >
                  <Grid item xs={4} sx={{ display: { xs: 'block', md: 'none' } }}>
                    <HeaderButton label='LAST' onClick={showLast} />
                  </Grid>
                  <Grid item xs={4} md={12}>
                    <Typography align='center' variant='h4'>{counter + 1} / {visibleQuestions.length}</Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ display: { xs: 'block', md: 'none' } }}>
                    <HeaderButton label='NEXT' onClick={showNext} />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={11} >
                <QuestionCard key={visibleQuestions[counter].id} data={visibleQuestions[counter]} onArchive={handleArchive} />
              </Grid>

              <Grid item xs={0} ></Grid>

            </Grid>
          </Grid>

          <Grid item sx={{ display: { xs: 'none', md: 'block' } }} md={2}   >
            <SideButton label='NEXT' onClick={showNext} />
          </Grid>

        </Grid>
      </Box >
    );

  if (DEBUG)
    content = (<Debug />);

  return content;
}

export default App;
