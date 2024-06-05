import { DeliveryDateStrategy } from './delivery-date.strategy';

export class MinLimitDeliveryDateStrategy extends DeliveryDateStrategy {
    calculate() {
        return this.actualDate.add(10, 'days').toISOString();
    }
}
