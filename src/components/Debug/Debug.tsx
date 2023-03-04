import { useEffect, useState } from 'react';

import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { v4 as uuidv4 } from 'uuid';

import { Question } from '../../context/types';

const loadFromStorage = () => {
    const storage = localStorage.getItem('debug');
    if (storage)
        return JSON.parse(storage);
    return [];
};
const saveToStorage = (data: Question[]) => {
    localStorage.setItem('debug', JSON.stringify(data));
};

const Debug = () => {
    const [questions, setQuestions] = useState<Question[]>(loadFromStorage);
    const [counter, setCounter] = useState<number>(-1);

    const [id, setId] = useState<string>('');
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    const [example, setExample] = useState<string>('');

    useEffect(() => {
        const q = questions[0];
        if (q) {
            setId(q.id);
            setQuestion(q.question);
            setAnswer(q.answer);
            setExample(q.example);
            setCounter(0);
        }
    }, []);

    useEffect(() => {
        saveToStorage(questions);
    }, [questions]);

    const addQuestion = () => {
        const uuid = uuidv4();
        setId(uuid);
        setQuestions(questions => [...questions, { id: uuid, question, answer, example }]);
        setCounter(counter => ++counter);
    };

    const updateQuestion = () => {
        const que = { id, question, answer, example };
        const ques = [...questions];
        ques.splice(questions.findIndex(q => q.id === id), 1, que);
        setQuestions(ques);
    };

    const handleSave = () => {
        if (question && answer)
            if (id)
                updateQuestion();
            else
                addQuestion();
    };

    const updateFields = (index: number) => {
        setCounter(index);
        setId(questions[index].id);
        setQuestion(questions[index].question);
        setAnswer(questions[index].answer);
        setExample(questions[index].example);
    };

    const handleLast = () => {
        if (!id)
            updateFields(counter);
        else {
            if (counter > 0)
                updateFields(counter - 1);
        }
    };

    const handleNext = () => {
        if (counter < questions.length - 1) {
            updateFields(counter + 1);
        }
        else {
            setId('');
            setQuestion('');
            setAnswer('');
            setExample('');
        }
    };

    return (
        <Box sx={{ margin: '20px' }}>

            <Box sx={{ margin: '10px' }}>
                <Grid container justifyContent='space-between'>
                    <Grid item xs={3} >
                        <Button variant='outlined' onClick={handleLast} fullWidth>
                            <Typography>
                                PREV
                            </Typography>
                        </Button>
                    </Grid>

                    <Grid item xs={3}>
                        <Button variant='contained' onClick={handleSave} fullWidth>
                            <Typography>
                                SAVE
                            </Typography>
                        </Button>
                    </Grid>

                    <Grid item xs={3}>
                        <Button variant='outlined' onClick={handleNext} fullWidth>
                            <Typography>
                                NEXT
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <Typography align='center' variant='h5'>
                {id ?
                    (counter + 1) + ' - Edit Question' :
                    (counter + 2) + ' - New Question'
                }
            </Typography>

            <Box sx={{ margin: '10px' }}>
                <Typography variant='caption'>Question</Typography>
                <TextField fullWidth sx={{ backgroundColor: '#282828', input: { color: '#c9d1d9' } }} onChange={(e) => setQuestion(e.target.value)} value={question} />
            </Box>

            <Box sx={{ margin: '10px' }}>
                <Typography variant='caption'>Answer</Typography>
                <TextField fullWidth sx={{ backgroundColor: '#282828', textarea: { color: '#c9d1d9' } }} onChange={(e) => setAnswer(e.target.value)} value={answer} multiline />
            </Box>

            <Box sx={{ margin: '10px' }}>
                <Typography variant='caption'>Example</Typography>
                <CodeEditor
                    language="js"
                    padding={15}
                    onChange={(e) => setExample(e.target.value)}
                    value={example}
                    style={{
                        fontSize: 12,
                        backgroundColor: "#282828",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                />
            </Box>

        </Box>
    );
};
export default Debug;