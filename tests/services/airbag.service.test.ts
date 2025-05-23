import { AirbagService, CrashSensor, AirbagIgniter, AirbagResult } from '../../services/airbag.services';
import {when} from 'jest-when'
import { MockProxy,mock } from 'jest-mock-extended';
import { ExpoLegacyDriver } from 'typeorm/driver/expo/legacy/ExpoLegacyDriver.js';

describe('AirbagService', () => 
{   
    let sensorMock :MockProxy<CrashSensor>;
    let igniterMock: MockProxy<AirbagIgniter>;
    let service :AirbagService 
    beforeEach(() => {
    sensorMock = mock<CrashSensor>();
    igniterMock = mock<AirbagIgniter>();
    service = new AirbagService(sensorMock, igniterMock);
  });
    
    it('deploys the airbag when a crash is detected', () => {
        {/*Arrange */}
        when(sensorMock.isCrashDetected).calledWith().mockReturnValue(true);
        {/*Act */}
        const result = service.deployAirbag();
        expect(igniterMock.trigger).toHaveBeenCalled()
        {/*Assert */}
        expect(result).toEqual({ triggered: true, force: 100, timing: 50 });
    });
    it('not deploys the airbag when a crash is not detected', () => {
        when(sensorMock.isCrashDetected).calledWith().mockReturnValue(false);

        const result = service.deployAirbag();

        expect(sensorMock.isCrashDetected).toHaveBeenCalled()
        expect(result).toEqual({ triggered: false });
        expect(igniterMock.trigger).not.toHaveBeenCalled()

        
    });

    

})

