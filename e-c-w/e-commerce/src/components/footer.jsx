
import { Typography } from '@mui/material'
import './footer.css'
import { Navigate } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
    return <>
    <div  id="footer">
    <div id='info'>
    <Typography variant="button" color={'white'} display="block" gutterBottom>
        Contact 
      </Typography>
      <Typography variant="button" color={'white'} display="block" gutterBottom>
        Terms & Conditions
      </Typography>
      <Typography variant="button" color={'white'} display="block" gutterBottom>
        Privacy Policy
      </Typography>
      <Typography variant="button" color={'white'} display="block" gutterBottom>
        Refunds & Cancellation Policy
      </Typography>
    </div>
 
    </div>
    </>
}

 export default  Footer