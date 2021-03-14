import React, { useEffect, useState } from 'react';
import './App.css';
import { Badge, Button, Card, Col, Container, Navbar, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { co2Temp } from './data/database'
import { Utils } from './utils/Utils';
import { Pack  } from '@potion/layout';
import { Svg, Circle  } from '@potion/element';

import forest from './lands/forest.png';
import ice from './lands/ice.png';
import people from './lands/people.png';
import sea from './lands/sea.png';
import whale from './lands/whale.png';
import polar from './lands/polar.png';
import bambi from './lands/bambi.png';
import mursu from './lands/mursu.png';
import human from './lands/human.png';
import human2 from './lands/human2.png';

export default function App() {

  const [avgTemperature, setAvgTemperature] = useState(1);
  const [avgCo2, setAvgCo2] = useState(1);

  const [co2, setCo2] = useState(1);
  const [temperature, setTemperature] = useState(1);
  const [co2Factor, setCo2Factor] = useState(1);
  const [co2Min] = useState(Math.min(...co2Temp.map(x =>parseFloat(x.CO2))));
  const [co2Max] = useState(Math.max(...co2Temp.map(x =>parseFloat(x.CO2))));

  const [co2Interaction, setCo2Interaction] = useState(1);
  const [temperatureInteraction, settemperatureInteraction] = useState(1);

  useEffect(() => {
    const temps = co2Temp.map(x => x.T);
    const co2s = co2Temp.map(x => x.CO2);
    const utils = new Utils(0, co2Temp);

    let sum = 0;
    for( let i = 0; i < temps.length; i++ ){
        sum += parseFloat(temps[i]);
    }
    setAvgTemperature(sum/temps.length);

    let co2Sum = 0;
    for( let i = 0; i < co2s.length; i++ ){
      co2Sum += parseFloat(co2s[i]);
    }
    setAvgCo2(co2Sum/co2s.length);

    setInterval(function(){
      setCo2(parseFloat(utils.getCo2()) + ( co2Interaction * 20));
      setTemperature(parseFloat(utils.getTemperature() + ( temperatureInteraction)));
      setCo2Factor(Math.floor(Math.random() * (co2Max - co2Min + 1) + co2Min));

      utils.setTick(utils.getTick() + 1);
    }, 3000);
  }, [])

  return (
    <Container>
      <>
        <Navbar bg="dark">
          <Navbar.Brand style={{color:"white"}}>Save the arctic</Navbar.Brand>
        </Navbar>
      </>
      <Row className="mb-5">
        
      </Row>
      <Row className="mb-5">
        <Col>
          <Button variant="outline-secondary">Temperature -</Button>
          <Button variant="outline-secondary">Temperature -</Button>
        </Col>
        <Col>
          <Button variant="outline-secondary">CO2 -</Button>
          <Button variant="outline-secondary">CO2 +</Button>
        </Col>
        <Col>
          <Button variant="outline-secondary">Sea level -</Button>
          <Button variant="outline-secondary">Sea level +</Button>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <img className="ice-img" src={ice} alt="ice" />
          <img className="forest-img" src={forest} alt="forest" />
          <img className="polar-img" src={polar} alt="polar" />
          <img className="bambi-img" src={bambi} alt="bambi" />
        </Col>
        <Col xs={12}>
          <img className="people-img" src={people} alt="people" />
          <img className="sea-img" src={sea} alt="sea" />
          <img className="whale-img" src={whale} alt="whale" />
          <img className="mursu-img" src={mursu} alt="mursu" />
          <img className="human-img" src={human} alt="human" />
          <img className="human2-img" src={human2} alt="human2" />
        </Col>

        <Col xs={6}>
          <Card>
            <Card.Body>Temperature: {temperature}</Card.Body>
          </Card>
        </Col>
        <Col xs={6}>
          <Card>
            <Card.Body>CO2: {co2}</Card.Body>
          </Card>
        </Col>

        <Col xs={12} className="mt-5">
          <Card>
            <Card.Header>Relative change</Card.Header>
            <Card.Body>
              <div>
              <Badge className="ml-1" style={{backgroundColor: "#00a9d4", color: "white"}}>Temperature</Badge>
              <Badge className="ml-1" style={{backgroundColor: "#324f39", color: "white"}}>CO2</Badge>
              <Badge className="ml-1" style={{backgroundColor: "#97671d", color: "white"}}>Air pollution</Badge>
              <Badge className="ml-1" style={{backgroundColor: "#23264f", color: "white"}}>Sea level</Badge>
              </div>
              {
                <Col xs={12}>
                  <Svg width={400} height={400}>
                  <Pack
                    data={{
                      children: [
                        { value: temperature / 0.1, key: 'ice' },
                        { value: co2 / 100, key: 'forest' },
                        { value: (temperature / 0.02) / avgTemperature, key: 'sea' },
                        { value: (co2 + co2Factor * 0.2) / 100, key: 'land' },
                      ],
                    }}
                    sum={datum => datum.value}
                    size={[400, 400]}
                    includeRoot={false}
                    nodeEnter={d => ({ ...d, r: 0 })}
                    animate
                  >
                    {
                      nodes => nodes.map(({ x, y, r, key }) => {
                        let color = "black";
                        switch (key) {
                          case "ice":
                            color = "#00a9d4";
                            break;
                            case "forest":
                              color = "#324f39";
                              break;
                            case "sea":
                              color = "#23264f";
                              break;
                            case "land":
                              color = "#97671d";
                              break;
                          default:
                            break;
                        }
                        return (
                        <Circle
                          key={key}
                          cx={x}
                          cy={y}
                          r={r}
                          fill={color}
                        />
                      )}
                      )
                    }
                  </Pack>
                </Svg>
              </Col>
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
