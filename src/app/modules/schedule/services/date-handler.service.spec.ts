import { TestBed } from '@angular/core/testing';

import { DateHandlerService } from './date-handler.service';


describe('DateHandlerService', () => {
  let service: DateHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getWeekForDate() function', () => {
    const weekMockup1: Date[] = [new Date('12.29.1969'), new Date('12.30.1969'), new Date('12.31.1969'), new Date('01.01.1970'), new Date('01.02.1970'), new Date('01.03.1970'), new Date('01.04.1970')];
    const weekMockup2: Date[] = [new Date('06.28.2010'), new Date('06.29.2010'), new Date('06.30.2010'), new Date('07.01.2010'), new Date('07.02.2010'), new Date('07.03.2010'), new Date('07.04.2010')];
    const weekMockup3: Date[] = [new Date('07.26.3013'), new Date('07.27.3013'), new Date('07.28.3013'), new Date('07.29.3013'), new Date('07.30.3013'), new Date('07.31.3013'), new Date('08.01.3013')];

    it('should return same values as in weekMockup1', () => {
      expect(service.getWeekForDate(new Date('01.04.1970'))).toEqual(weekMockup1);
    });

    it('should return same values as in weekMockup2', () => {
      expect(service.getWeekForDate(new Date('06.29.2010'))).toEqual(weekMockup2);
    });

    it('should return same values as in weekMockup3', () => {
      expect(service.getWeekForDate(new Date('07.26.3013'))).toEqual(weekMockup3);
    });
  });
});
