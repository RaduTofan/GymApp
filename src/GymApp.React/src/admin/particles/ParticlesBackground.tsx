import Particles from 'react-particles-js';
import '../../App.css';

const ParticlesBackground = () => {

    return (
        <div id="particles-js">
            <Particles
                params={{
                    particles: {
                        color: {
                            value: '#6599FF'
                        },
                        line_linked: {
                            color: {
                                value: '#097054'
                            }
                        },
                        number: {
                            value: 75
                        },
                        size: {
                            value: 5
                        }
                    }
                }}
            />
        </div>
    )
}



export default ParticlesBackground;