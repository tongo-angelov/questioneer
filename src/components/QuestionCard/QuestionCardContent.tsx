import { Box, styled, TextField, Typography } from "@mui/material";
import CodeEditor from '@uiw/react-textarea-code-editor';

const Content = styled(Box)(() => ({
    backgroundColor: '#222',
    marginTop: '10px',
    marginBottom: '10px',
}));

const CustomTextField = styled(TextField)({
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "#c9d1d9",
    },
});

type QuestionCardContentProps = {
    answer: string;
    example?: string;
};

const QuestionCardContent = ({ answer, example }: QuestionCardContentProps) => {
    return (
        < >
            <Content>
                <CustomTextField fullWidth disabled multiline value={answer} />
            </Content>

            {example &&
                <CodeEditor
                    disabled
                    value={example}
                    language="js"
                    padding={15}
                    style={{
                        fontSize: 14,
                        backgroundColor: "#222",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                />}
        </>
    );
};

export default QuestionCardContent;