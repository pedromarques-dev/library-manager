import { DeliveryDateStrategy } from './delivery-date.strategy';

export class MediumLimitDeliveryDateStrategy extends DeliveryDateStrategy {
    calculate() {
        return this.actualDate.add(20, 'days').toISOString();
    }
}
