import { Subject } from "../Subject";

describe("reactive/Subject", () => {
    describe(".subscribe()/.publish()", () => {
        it("should notify subscribers.", () => {
            const sub1 = jest.fn();
            const sub2 = jest.fn();
            const subject = new Subject();
            subject.subscribe(sub1);
            subject.subscribe(sub2);
            subject.publish("hello");

            expect(sub1).toHaveBeenCalled();
            expect(sub1).toHaveBeenCalledWith("hello");
            expect(sub2).toHaveBeenCalled();
            expect(sub2).toHaveBeenCalledWith("hello");
        });

        it("should not called unsubscribed subscribers.", () => {
            const sub1 = jest.fn();
            const sub2 = jest.fn();
            const subject = new Subject();
            subject.subscribe(sub1);
            subject.subscribe(sub2)();
            subject.publish("hello");

            expect(sub1).toHaveBeenCalled();
            expect(sub1).toHaveBeenCalledWith("hello");
            expect(sub2).not.toHaveBeenCalled();
        });
    });

    describe(".unbind()", () => {
        const sub = jest.fn();
        const subject = new Subject();
        subject.subscribe(sub);
        subject.unbind();
        subject.publish("hello");

        expect(sub).not.toHaveBeenCalled();
    });
});
