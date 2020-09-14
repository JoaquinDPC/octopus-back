// Sevice
import { GeneralService } from '../../src/services/GeneralService';

// Mocks 
// import { saveNewMission } from "../../src/models/Mission";
const algo = require("../../src/models/Mission");


describe("MissionServiceTest", () => {

  describe("NewMissionServiceTest", () => {
    const saveNewMissionMock = jest.spyOn(algo, 'saveNewMission');

    afterEach(() => {
      saveNewMissionMock.mockRestore();
    });

    it("can set a new mission", async () => {
      const missionName = "Test mission";
      const description = "Test description";

      saveNewMissionMock.mockImplementation(() => ({ 
        success: true, insertId: 1 
      }));

      const { success, data, message } = await GeneralService.newMission(missionName, description);

      expect(success).toEqual(true);
      expect(data.insertId).toEqual(1);
      expect(message).toEqual(undefined);
      expect(saveNewMissionMock).toHaveBeenCalled();
    });
  });

});