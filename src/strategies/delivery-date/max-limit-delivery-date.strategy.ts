import { DeliveryDateStrategy } from './delivery-date.strategy';

export class MaxLimitDeliveryDateStrategy extends DeliveryDateStrategy {
    calculate() {
        return this.actualDate.add(30, 'days').toISOString();
    }
}
