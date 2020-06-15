import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';

let framework;
let frameworks = {
	cx: require('./frameworks/cx.json'),
	rut: require('./frameworks/rut.json'),
	gut: require('./frameworks/gut.json'),
	moskow: require('./frameworks/cx.json'),
	rice: require('./frameworks/cx.json'),
};

var pathname = window.location.pathname.replace('/','');
if(pathname){
	framework = frameworks[pathname];
}else{
	framework = frameworks['cx'];
}

function App() {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
					type: prefersDarkMode ? 'dark' : 'light',
					primary: {
						main: '#ff4400',
					},
					secondary: {
						light: '#0066ff',
						main: '#0044ff',
						contrastText: '#ffcc00',
					},
					contrastThreshold: 3,
					tonalOffset: 0.2,
        },
      }),
		[prefersDarkMode],
	);

	const [kind, setKind] = React.useState(framework[0]);
	const handleKind = (event, newKind) => {
		setValue([]);
		setPriority([]);
		if(newKind){
			setKind(newKind);
		}
	};
	
	const [value, setValue] = React.useState([]);

	const handleValue  = name => (event, newValue) =>  {
		value[name] = newValue;
		setValue(value);
		showPriority(value);
	};

	const [priority, setPriority] = React.useState([]);

	function calculateScore(value){
		let score = 0;
		for(let i=0; kind.variables.length>i; i++){
			if(value[kind.variables[i].name]){
				console.log(kind.variables[i].calc);
				switch(kind.variables[i].calc){
					case 'sum':
						score = score + value[kind.variables[i].name];
					break;
					case 'sub':
						score = score - value[kind.variables[i].name];
					break;
					case 'mul':
						if(score == 0){
							score = value[kind.variables[i].name];
						}else{
							score = score * value[kind.variables[i].name];
						}
					break;
					case 'div':
						score = score / value[kind.variables[i].name];
					break;
					default:
						score = score + value[kind.variables[i].name];
				}
			}else{
				score = null;
				break;
			}
		}		
		return score;
	}

	function showPriority(value){
		let score = calculateScore(value);
		var tempPriority = [];
		if(score){
			if(kind.priority){
				for(let i=0; kind.priority.length>i; i++){
					if(kind.priority[i].minscore <= score && kind.priority[i].maxscore >= score){
						tempPriority.title = kind.priority[i].name;
						tempPriority.desc = kind.priority[i].description;
						tempPriority.img = kind.priority[i].image;

						if(prefersDarkMode){
							tempPriority.style = {backgroundColor: kind.priority[i].color};
						}else{
							tempPriority.style = {color: kind.priority[i].color};
						}
					} 
				}
			}else{
				tempPriority.title = score + ' pontos'
			}
		}
		setPriority(tempPriority);
	}

	return (
		<main>
			<ThemeProvider theme={theme}>
			<CssBaseline/>

			<Typography variant="h4">Simasia</Typography>
			<Typography variant="subtitle1">Um simples priorizador de Issues!</Typography>

			<ToggleButtonGroup 
						className="kinds"
						value={kind}
						exclusive
						onChange={handleKind}
					>
				{framework.map(kindobj => (
					<ToggleButton className="kind-option" value={kindobj} aria-label={kindobj.label}>
						{kindobj.name}
					</ToggleButton>
				))}
			</ToggleButtonGroup>

			{kind.variables.map(variable => ( 
				<div>
					<Typography variant="h5">{variable.title}</Typography>
					<ToggleButtonGroup 
						className="options"
						value={value[variable.name]}
						exclusive
						onChange={handleValue(variable.name)}
						aria-label="text Value"
					>
						
					{variable.values.map(value => ( 
						<ToggleButton className="option" value={value.score} aria-label={value.name}>
							{value.questions.map(question => (
								//<Card className="root" >
								//	<CardContent>
										<Typography variant="body2" component="p">
											{question}
										</Typography>
								//	</CardContent>
								//</Card>
							))}
						</ToggleButton>
					))}	
					</ToggleButtonGroup>
				</div>
			))}	

			<Card className="result-card" style={priority.style}>
				<CardActionArea>
					<CardMedia
						className="result-img"
						image={priority.img}
						title="Contemplative Reptile"
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{priority.title}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{priority.desc}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>

			<Typography variant="h5">Metodologia</Typography>
			<div className="meth" dangerouslySetInnerHTML={{__html: kind.methodology}}></div>

			</ThemeProvider>
		</main>
	);
}

export default App;
